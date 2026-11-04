import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { and, DrizzleQueryError, eq, sql } from "drizzle-orm";
import postgres from "postgres";
import type { RouteHandler } from "fastify";


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
