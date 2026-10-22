import * as tables from "../../database/schema/index.js";
import type { AgentsmdParams, AgentsmdResponse } from "./agentsmd.schema.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getAgentsmd: RouteHandler<{
  Params: AgentsmdParams;
  Reply: AgentsmdResponse;
}> = async (req, res) => {
  try {
    const { projectId } = req.params;

    const [agentsmd] = await req.server.drizzle
      .select()
      .from(tables.agentsmd)
      .where(eq(tables.agentsmd.projectId, projectId))
      .limit(1);

    if (!agentsmd) {
      return res.notFound("AGENTS.md not found");
    }

    return res.code(200).send(agentsmd);
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};
