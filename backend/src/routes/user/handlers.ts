import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getUsers: RouteHandler<{
  Querystring: schemas.UsersQuery;
  Reply: schemas.UsersResponse;
}> = async (req, res) => {
  const { username, lookup } = req.query;

  const users = await req.server.drizzle
    .select({
      id: tables.user.id,
      email: tables.user.email,
      username: tables.profile.username,
      createdAt: tables.user.createdAt,
    })
    .from(tables.user)
    .innerJoin(tables.profile, eq(tables.profile.userId, tables.user.id))
    .where(username === undefined ? undefined : eq(tables.profile.username, username));

  if (lookup === true && users.length === 0) {
    throw req.server.httpErrors.notFound("Users not found");
  }

  return res.code(200).send(users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  })));
};

export const getMe: RouteHandler<{
  Reply: schemas.UserResponse;
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
