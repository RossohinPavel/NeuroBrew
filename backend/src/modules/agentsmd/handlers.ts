import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getAgentsmd: RouteHandler<{
  Params: schemas.AgentsmdParams;
  Reply: schemas.AgentsmdResponse;
}> = async (req, res) => {
  const { projectId, profileId: accountId } = req.params;

  const [result] = await req.server.drizzle
    .select()
    .from(tables.agentsmd)
    .innerJoin(tables.project, eq(tables.agentsmd.projectId, tables.project.id))
    .where(and(
      eq(tables.agentsmd.projectId, projectId),
      eq(tables.project.accountId, accountId),
    ))
    .limit(1);

  if (!result) {
    throw req.server.httpErrors.notFound("AGENTS.md not found");
  }

  return res.code(200).send(result.agentsmd);
};
