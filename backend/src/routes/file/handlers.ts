import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { and, DrizzleQueryError, eq, sql } from "drizzle-orm";
import postgres from "postgres";
import type { RouteHandler } from "fastify";


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
