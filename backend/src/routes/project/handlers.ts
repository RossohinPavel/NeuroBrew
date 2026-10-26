import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getProjects: RouteHandler<{
  Querystring: schemas.ProjectsQuery;
  Reply: schemas.ProjectsResponse;
}> = async (req, res) => {
  const { name } = req.query;

  const projects = await req.server.drizzle
    .select()
    .from(tables.project)
    .where(name === undefined ? undefined : eq(tables.project.name, name));

  return res.code(200).send(projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
  })));
};

export const getProject: RouteHandler<{
  Params: schemas.ProjectParams;
  Reply: schemas.ProjectResponse;
}> = async (req, res) => {
  const { id } = req.params;

  const [project] = await req.server.drizzle
    .select()
    .from(tables.project)
    .where(eq(tables.project.id, id))
    .limit(1);

  if (!project) {
    throw req.server.httpErrors.notFound("Project not found");
  }

  return res.code(200).send({
    ...project,
    createdAt: project.createdAt.toISOString(),
  });
};
