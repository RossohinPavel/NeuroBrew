import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getProjects: RouteHandler<{
  Querystring: schemas.ProjectsQuery;
  Reply: schemas.ProjectsResponse;
}> = async (req, res) => {
  const { mine, username } = req.query;

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

export const lookupProject: RouteHandler<{
  Querystring: schemas.ProjectLookupQuery;
  Reply: schemas.ProjectResponse;
}> = async (req, res) => {
  const { username, projectName } = req.query;

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
