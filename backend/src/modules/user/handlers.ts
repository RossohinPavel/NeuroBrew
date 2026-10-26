import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const getUsers: RouteHandler<{
  Querystring: schemas.UsersQuery;
  Reply: schemas.UsersResponse;
}> = async (req, res) => {
  const { email, username } = req.query;

  const users = await req.server.drizzle
    .select({
      id: tables.user.id,
      email: tables.user.email,
      username: tables.profile.username,
      createdAt: tables.user.createdAt,
    })
    .from(tables.user)
    .innerJoin(tables.profile, eq(tables.profile.userId, tables.user.id))
    .where(and(
      email === undefined ? undefined : eq(tables.user.email, email),
      username === undefined ? undefined : eq(tables.profile.username, username),
    ));

  return res.code(200).send(users.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt.toISOString(),
  })));
};
