import * as tables from "../../database/schema/index.js";
import type * as schemas from "./schemas.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getProjects: RouteHandler<{
  Params: schemas.ProjectsParams;
  Querystring: schemas.ProjectsQuery;
  Reply: schemas.ProjectsResponse;
}> = async (req, res) => {
  const { profileId: accountId } = req.params;
  const { name } = req.query;

  const projects = await req.server.drizzle
    .select()
    .from(tables.project)
    .where(and(
      eq(tables.project.accountId, accountId),
      name === undefined ? undefined : eq(tables.project.name, name),
    ));

  return res.code(200).send(projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
  })));
};

export const getProject: RouteHandler<{
  Params: schemas.ProjectParams;
  Reply: schemas.ProjectResponse;
}> = async (req, res) => {
  const { id, profileId: accountId } = req.params;

  const [project] = await req.server.drizzle
    .select()
    .from(tables.project)
    .where(and(
      eq(tables.project.id, id),
      eq(tables.project.accountId, accountId),
    ))
    .limit(1);

  if (!project) {
    throw req.server.httpErrors.notFound("Project not found");
  }

  return res.code(200).send({
    ...project,
    createdAt: project.createdAt.toISOString(),
  });
};
