import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getMe: RouteHandler<{
  Reply: schemas.MeResponse;
}> = async (req, res) => {
  const { accountId } = req.user;

  const [userAccount] = await req.server.drizzle
    .select({
      id: tables.account.id,
      email: tables.account.email,
      username: tables.profile.username,
      createdAt: tables.account.createdAt,
    })
    .from(tables.account)
    .innerJoin(tables.profile, eq(tables.profile.accountId, tables.account.id))
    .where(eq(tables.account.id, accountId))
    .limit(1);

  if (!userAccount) {
    throw req.server.httpErrors.unauthorized("Invalid access token");
  }

  return res.code(200).send({
    ...userAccount,
    createdAt: userAccount.createdAt.toISOString(),
  });
};
