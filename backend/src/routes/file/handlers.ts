import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { and, DrizzleQueryError, eq, sql } from "drizzle-orm";
import postgres from "postgres";
import type { RouteHandler } from "fastify";


// Возвращает файл по имени владельца, названию проекта и имени файла.
export const getFile: RouteHandler<{
  Body: contracts.GetFileRequest;
  Reply: contracts.FileResponse;
}> = async (req, res) => {
  const { username, projectName, name } = req.body;

  const [result] = await req.server.drizzle
    .select({ file: tables.file })
    .from(tables.file)
    .innerJoin(tables.project, eq(tables.file.projectId, tables.project.id))
    .innerJoin(tables.profile, eq(tables.project.userId, tables.profile.userId))
    .where(and(
      eq(tables.profile.username, username),
      eq(tables.project.name, projectName),
      eq(tables.file.name, name),
    ))
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

// Возвращает файлы проекта по имени владельца и названию проекта.
export const listFiles: RouteHandler<{
  Body: contracts.ListFilesRequest;
  Reply: contracts.ListFilesResponse;
}> = async (req, res) => {
  const { username, projectName } = req.body;

  const files = await req.server.drizzle
    .select({ file: tables.file })
    .from(tables.file)
    .innerJoin(tables.project, eq(tables.file.projectId, tables.project.id))
    .innerJoin(tables.profile, eq(tables.project.userId, tables.profile.userId))
    .where(and(
      eq(tables.profile.username, username),
      eq(tables.project.name, projectName),
    ));

  return res.code(200).send(files.map(({ file }) => ({
    ...file,
    createdAt: file.createdAt.toISOString(),
    updatedAt: file.updatedAt.toISOString(),
  })));
};

// Создает файл в проекте текущего пользователя и закрепляет имя AGENTS.md за типом agentsmd.
export const createFile: RouteHandler<{
  Body: contracts.CreateFileRequest;
  Reply: contracts.FileResponse;
}> = async (req, res) => {
  const { projectName, type, content } = req.body;
  const name = type === "agentsmd" ? "AGENTS.md" : req.body.name;

  try {
    const [file] = await req.server.drizzle
      .insert(tables.file)
      .select(req.server.drizzle
        .select({
          projectId: tables.project.id,
          type: sql<contracts.CreateFileRequest["type"]>`${type}`.as("type"),
          name: sql<string>`${name}`.as("name"),
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
      throw req.server.httpErrors.conflict("File name is already in use");
    }

    throw error;
  }
};
