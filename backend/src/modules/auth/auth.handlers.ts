import * as schema from "../../database/schema/index.js";
import { hash, verify } from "argon2";
import type { LoginRequest, RegisterRequest } from "@shared/contracts";
import type { AuthTokensResponse } from "./auth.schema.js";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const register: RouteHandler<{
  Body: RegisterRequest;
  Reply: AuthTokensResponse;
}> = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const passwordHash = await hash(password);
    const [user] = await req.server.drizzle
      .insert(schema.users)
      .values({ email,passwordHash,username })
      .returning({ id: schema.users.id });
    if (!user) {
      throw req.server.httpErrors.internalServerError("Failed to create user");
    }
    const accessToken = req.server.jwt.access.sign({ userId: user.id });
    const refreshToken = req.server.jwt.refresh.sign({ userId: user.id });
    return res.code(201).send({
      accessToken,
      refreshToken,
      tokenType: "Bearer",
      expiresIn: 900,
    });
  } catch (error) {
    req.log.error(error);
    throw error;
  }
};

export const login: RouteHandler<{
  Body: LoginRequest;
  Reply: AuthTokensResponse;
}> = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await req.server.drizzle
      .select({
        id: schema.users.id,
        passwordHash: schema.users.passwordHash,
      })
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    if (!user || !await verify(user.passwordHash, password)) {
      throw req.server.httpErrors.unauthorized("Invalid email or password");
    }
    const accessToken = req.server.jwt.access.sign({ userId: user.id });
    const refreshToken = req.server.jwt.refresh.sign({ userId: user.id });
    return res.code(200).send({
      accessToken,
      refreshToken,
      tokenType: "Bearer",
      expiresIn: 900,
    });
  } catch (error) {
    req.log.error(error);
    throw error;
  }
};

export const refresh: RouteHandler = async (_req, res) => {
  return res.code(501).send();
};
