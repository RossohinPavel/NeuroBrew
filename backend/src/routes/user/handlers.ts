import type * as contracts from "@shared/contracts";
import * as tables from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getUser: RouteHandler<{
  Querystring: contracts.UserGetQuery;
  Reply: contracts.UserResponse;
}> = async (req, res) => {
  const { username } = req.query;

  const [user] = await req.server.drizzle
    .select({
      id: tables.user.id,
      email: tables.user.email,
      username: tables.profile.username,
      createdAt: tables.user.createdAt,
    })
    .from(tables.user)
    .innerJoin(tables.profile, eq(tables.profile.userId, tables.user.id))
    .where(eq(tables.profile.username, username))
    .limit(1);

  if (!user) {
    throw req.server.httpErrors.notFound("User not found");
  }

  return res.code(200).send({
    ...user,
    createdAt: user.createdAt.toISOString(),
  });
};
