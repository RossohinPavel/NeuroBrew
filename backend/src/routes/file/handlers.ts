import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { and, asc, DrizzleQueryError, eq, sql } from "drizzle-orm";
import postgres from "postgres";
import type { RouteHandler } from "fastify";


// Возвращает файл по имени владельца проекта, имени проекта и пути к файлу.
export const getFile: RouteHandler<{
  Body: contracts.FileGetRequest;
  Reply: contracts.FileResponse;
}> = async (req, res) => {
  const { username, projectName, path } = req.body;

  const [result] = await req.server.drizzle
    .select({ file: tables.file })
    .from(tables.file)
    .innerJoin(tables.project, and(
      eq(tables.file.projectId, tables.project.id),
      eq(tables.project.name, projectName),
    ))
    .innerJoin(tables.profile, and(
      eq(tables.project.userId, tables.profile.userId),
      eq(tables.profile.username, username),
    ))
    .where(eq(tables.file.path, path))
    .limit(1);

  if (!result) {
    throw req.server.httpErrors.notFound("File not found");
  }

  return res.code(200).send({
    ...result.file,
    createdAt: result.file.createdAt.toISOString(),
    updatedAt: result.file.updatedAt.toISOString(),
  });
};

// Возвращает файлы проекта по имени пользователя и названию проекта или пустой список.
export const listFiles: RouteHandler<{
  Body: contracts.FileListRequest;
  Reply: contracts.FileListResponse;
}> = async (req, res) => {
  const { username, projectName } = req.body;

  const files = await req.server.drizzle
    .select({ file: tables.file })
    .from(tables.file)
    .innerJoin(tables.project, and(
      eq(tables.file.projectId, tables.project.id),
      eq(tables.project.name, projectName),
    ))
    .innerJoin(tables.profile, and(
      eq(tables.project.userId, tables.profile.userId),
      eq(tables.profile.username, username),
    ))
    .orderBy(asc(tables.file.path));

  return res.code(200).send(files.map(({ file }) => ({
    ...file,
    createdAt: file.createdAt.toISOString(),
    updatedAt: file.updatedAt.toISOString(),
  })));
};

// Создает файл только в проекте текущего пользователя.
export const createFile: RouteHandler<{
  Body: contracts.CreateFileRequest;
  Reply: contracts.FileResponse;
}> = async (req, res) => {
  const { projectName, path, content } = req.body;

  try {
    const [file] = await req.server.drizzle
      .insert(tables.file)
      .select(req.server.drizzle
        .select({
          projectId: tables.project.id,
          path: sql<string>`${path}`.as("path"),
          content: sql<string>`${content}`.as("content"),
        })
        .from(tables.project)
        .where(and(
          eq(tables.project.name, projectName),
          eq(tables.project.userId, req.user.userId),
        )))
      .returning();

    if (!file) {
      throw req.server.httpErrors.notFound("Project not found");
    }

    return res.code(201).send({
      ...file,
      createdAt: file.createdAt.toISOString(),
      updatedAt: file.updatedAt.toISOString(),
    });
  } catch (error) {
    if (
      error instanceof DrizzleQueryError
      && error.cause instanceof postgres.PostgresError
      && error.cause.code === "23505"
    ) {
      throw req.server.httpErrors.conflict("File path is already in use");
    }

    throw error;
  }
};
