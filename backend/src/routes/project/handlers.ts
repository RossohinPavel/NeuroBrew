import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
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
