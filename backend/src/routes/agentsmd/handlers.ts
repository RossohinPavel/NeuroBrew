import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const lookupAgentsmd: RouteHandler<{
  Querystring: schemas.AgentsmdLookupQuery;
  Reply: schemas.AgentsmdResponse;
}> = async (req, res) => {
  const { username, projectName } = req.query;

  const [result] = await req.server.drizzle
    .select({ agentsmd: tables.agentsmd })
    .from(tables.agentsmd)
    .innerJoin(tables.project, eq(tables.agentsmd.projectId, tables.project.id))
    .innerJoin(tables.profile, eq(tables.project.userId, tables.profile.userId))
    .where(and(
      eq(tables.profile.username, username),
      eq(tables.project.name, projectName),
    ))
    .limit(1);

  if (!result) {
    throw req.server.httpErrors.notFound("AGENTS.md not found");
  }

  return res.code(200).send(result.agentsmd);
};
