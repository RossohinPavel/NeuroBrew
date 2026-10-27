import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getProjects: RouteHandler<{
  Querystring: schemas.ProjectsQuery;
  Reply: schemas.ProjectsResponse;
}> = async (req, res) => {
  const { userId } = req.user;
  const { name } = req.query;

  const projects = await req.server.drizzle
    .select()
    .from(tables.project)
    .where(and(
      eq(tables.project.userId, userId),
      name === undefined ? undefined : eq(tables.project.name, name),
    ));

  return res.code(200).send(projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
  })));
};
