import * as schema from "../../database/schema/index.js";
import type { AuthTokensResponse } from "./auth.schema.js";
import { hash } from "argon2";
import type { RegisterRequest } from "@shared/contracts";
import type { RouteHandler } from "fastify";


type RegisterRouteHandler = RouteHandler<{
  Body: RegisterRequest;
  Reply: AuthTokensResponse;
}>;

export const register: RegisterRouteHandler = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const passwordHash = await hash(password);
    const [user] = await req.server.drizzle
      .insert(schema.users)
      .values({ email,passwordHash,username })
      .returning({ id: schema.users.id });
    if (!user) {
      throw new Error("Failed to create user");
    }
    const accessToken = req.server.jwt.access.sign({ userId: user.id });
    const refreshToken = req.server.jwt.refresh.sign({ userId: user.id });
    res.code(201);
    return { accessToken, refreshToken, tokenType: "Bearer", expiresIn: 900 };
  } catch (error) {
    req.log.error(error);
    throw error;
  }
};

export const login: RouteHandler = async (_req, res) => {
  return res.code(501).send();
};

export const refresh: RouteHandler = async (_req, res) => {
  return res.code(501).send();
};
