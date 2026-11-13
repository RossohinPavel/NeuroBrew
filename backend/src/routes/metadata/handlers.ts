import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { desc } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const listChangelog: RouteHandler<{
  Reply: contracts.ListChangelogResponse;
}> = async (req, res) => {
  const entries = await req.server.drizzle
    .select()
    .from(tables.changelog)
    .orderBy(desc(tables.changelog.createdAt));

  return res.code(200).send(entries.map((entry) => ({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
  })));
};
