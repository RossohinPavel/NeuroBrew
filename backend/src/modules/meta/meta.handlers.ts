import * as schema from "../../database/schema/index.js";
import type { ChangelogResponse } from "./meta.schema.js";
import type { RouteHandler } from "fastify";


export const getChangelog: RouteHandler<{
  Reply: ChangelogResponse;
}> = async (req, res) => {
  try {
    const entries = await req.server.drizzle
      .select()
      .from(schema.changelog);

    return res.code(200).send(entries.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    })));
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};
