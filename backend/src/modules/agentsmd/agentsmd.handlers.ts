import * as tables from "../../database/schema/index.js";
import type { AgentsmdListQuery, AgentsmdListResponse } from "./agentsmd.schema.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";
import type { SQL } from "drizzle-orm";


export const getAgentsmdList: RouteHandler<{
  Querystring: AgentsmdListQuery;
  Reply: AgentsmdListResponse;
}> = async (req, res) => {
  try {
    const { projectId } = req.query;

    const query = req.server.drizzle
      .select()
      .from(tables.agentsmd);

    const filters: SQL[] = [];

    if (projectId !== undefined) {
      filters.push(eq(tables.agentsmd.projectId, projectId));
    }

    const agentsmdList = await query.where(and(...filters));

    return res.code(200).send(agentsmdList);
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};
