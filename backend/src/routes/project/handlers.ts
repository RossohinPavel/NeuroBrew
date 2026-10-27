import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getProjects: RouteHandler<{
  Querystring: schemas.ProjectsQuery;
  Reply: schemas.ProjectsResponse;
}> = async (req, res) => {
  const { username } = req.query;

  const projects = await req.server.drizzle
    .select({
      id: tables.project.id,
      userId: tables.project.userId,
      name: tables.project.name,
      createdAt: tables.project.createdAt,
    })
    .from(tables.project)
    .leftJoin(tables.profile, eq(tables.profile.userId, tables.project.userId))
    .where(username === undefined ? undefined : eq(tables.profile.username, username));

  return res.code(200).send(projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
  })));
};

