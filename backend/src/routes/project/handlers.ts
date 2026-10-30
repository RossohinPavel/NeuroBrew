import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getProject: RouteHandler<{
  Body: contracts.ProjectGetRequest;
  Reply: contracts.ProjectResponse;
}> = async (req, res) => {
  const { username, projectName } = req.body;

  const [result] = await req.server.drizzle
    .select({ project: tables.project })
    .from(tables.project)
    .innerJoin(tables.profile, and(
      eq(tables.project.userId, tables.profile.userId),
      eq(tables.profile.username, username),
    ))
    .where(eq(tables.project.name, projectName))
    .limit(1);

  if (!result) {
    throw req.server.httpErrors.notFound("Project not found");
  }

  return res.code(200).send({
    ...result.project,
    createdAt: result.project.createdAt.toISOString(),
  });
};

export const listProjects: RouteHandler<{
  Body: contracts.ProjectListRequest;
  Reply: contracts.ProjectListResponse;
}> = async (req, res) => {
  const { mine, username } = req.body;

  const query = req.server.drizzle
    .select({
      id: tables.project.id,
      userId: tables.project.userId,
      name: tables.project.name,
      createdAt: tables.project.createdAt,
    })
    .from(tables.project);

  if (mine === true) {
    query
      .where(eq(tables.project.userId, req.user.userId));
  } else if (username !== undefined) {
    query
      .leftJoin(tables.profile, eq(tables.profile.userId, tables.project.userId))
      .where(eq(tables.profile.username, username));
  }

  const projects = await query;

  return res.code(200).send(projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
  })));
};

export const createProject: RouteHandler<{
  Body: contracts.CreateProjectRequest;
  Reply: contracts.ProjectResponse;
}> = async (req, res) => {
  const project = await req.server.drizzle.transaction(async (tx) => {
    const [project] = await tx
      .insert(tables.project)
      .values({
        userId: req.user.userId,
        name: req.body.name,
      })
      .onConflictDoNothing({ target: [tables.project.userId, tables.project.name] })
      .returning();

    if (!project) {
      throw req.server.httpErrors.conflict("Project name is already in use");
    }

    await tx
      .insert(tables.agentsmd)
      .values({
        projectId: project.id,
        content: `# ${project.name}`,
      });

    return project;
  });

  return res.code(201).send({
    ...project,
    createdAt: project.createdAt.toISOString(),
  });
};

