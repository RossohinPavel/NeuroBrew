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

export const createChangelog: RouteHandler<{
  Body: contracts.CreateChangelogRequest;
  Reply: contracts.CreateChangelogResponse;
}> = async (req, res) => {
  const [entry] = await req.server.drizzle
    .insert(tables.changelog)
    .values({ title: req.body.title })
    .returning();

  if (!entry) {
    throw req.server.httpErrors.internalServerError("Failed to create changelog entry");
  }

  return res.code(201).send({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
  });
};
