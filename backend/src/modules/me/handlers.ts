import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getMe: RouteHandler<{
  Reply: schemas.MeResponse;
}> = async (req, res) => {
  const { userId } = req.user;

  const [user] = await req.server.drizzle
    .select({
      id: tables.user.id,
      email: tables.user.email,
      username: tables.profile.username,
      createdAt: tables.user.createdAt,
    })
    .from(tables.user)
    .innerJoin(tables.profile, eq(tables.profile.userId, tables.user.id))
    .where(eq(tables.user.id, userId))
    .limit(1);

  if (!user) {
    throw req.server.httpErrors.unauthorized("Invalid access token");
  }

  return res.code(200).send({
    ...user,
    createdAt: user.createdAt.toISOString(),
  });
};
