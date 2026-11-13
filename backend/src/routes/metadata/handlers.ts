import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { desc } from "drizzle-orm";
import type { RouteHandler } from "fastify";


const CHANGELOG_CACHE_KEY = "metadata:changelog:list";
const CHANGELOG_CACHE_TTL_SECONDS = 300;

export const listChangelog: RouteHandler<{
  Reply: contracts.ListChangelogResponse;
}> = async (req, res) => {
  const cachedEntries = await req.server.redis.get(CHANGELOG_CACHE_KEY);

  if (cachedEntries !== null) {
    return res.code(200).send(
      JSON.parse(cachedEntries) as unknown as contracts.ListChangelogResponse,
    );
  }

  const entries = await req.server.drizzle
    .select()
    .from(tables.changelog)
    .orderBy(desc(tables.changelog.createdAt));

  const response = entries.map((item) => ({
    id: item.id,
    createdAt: item.createdAt.toISOString(),
    title: item.title,
  }));

  await req.server.redis.set(
    CHANGELOG_CACHE_KEY,
    JSON.stringify(response),
    "EX",
    CHANGELOG_CACHE_TTL_SECONDS,
  );

  return res.code(200).send(response);
};
