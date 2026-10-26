import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getProfiles: RouteHandler<{
  Querystring: schemas.ProfilesQuery;
  Reply: schemas.ProfilesResponse;
}> = async (req, res) => {
  const { email, username } = req.query;

  const userAccounts = await req.server.drizzle
    .select({
      id: tables.account.id,
      email: tables.account.email,
      username: tables.profile.username,
      createdAt: tables.account.createdAt,
    })
    .from(tables.account)
    .innerJoin(tables.profile, eq(tables.profile.accountId, tables.account.id))
    .where(and(
      email === undefined ? undefined : eq(tables.account.email, email),
      username === undefined ? undefined : eq(tables.profile.username, username),
    ));

  return res.code(200).send(userAccounts.map((userAccount) => ({
    id: userAccount.id,
    email: userAccount.email,
    username: userAccount.username,
    createdAt: userAccount.createdAt.toISOString(),
  })));
};
