import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type {
  UserParams,
  UserResponse,
  UsersQuery,
  UsersResponse,
} from "./user.schemas.js";
import type { RouteHandler } from "fastify";


export const getUsers: RouteHandler<{
  Querystring: UsersQuery;
  Reply: UsersResponse;
}> = async (req, res) => {
  try {
    const { email, username } = req.query;

    const users = await req.server.drizzle
      .select({
        id: tables.users.id,
        email: tables.users.email,
        username: tables.users.username,
        createdAt: tables.users.createdAt,
      })
      .from(tables.users)
      .where(and(
        email === undefined ? undefined : eq(tables.users.email, email),
        username === undefined ? undefined : eq(tables.users.username, username),
      ));

    return res.code(200).send(users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
    })));
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};

export const getUserById: RouteHandler<{
  Params: UserParams;
  Reply: UserResponse;
}> = async (req, res) => {
  try {
    const { id } = req.params;

    const [user] = await req.server.drizzle
      .select({
        id: tables.users.id,
        email: tables.users.email,
        username: tables.users.username,
        createdAt: tables.users.createdAt,
      })
      .from(tables.users)
      .where(eq(tables.users.id, id))
      .limit(1);

    if (!user) {
      return res.notFound("User not found");
    }

    return res.code(200).send({
      ...user,
      createdAt: user.createdAt.toISOString(),
    });
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};
