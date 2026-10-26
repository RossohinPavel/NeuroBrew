import type * as contracts from "@shared/contracts";
import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { hash, verify } from "argon2";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


export const register: RouteHandler<{
  Body: contracts.RegisterRequest;
  Reply: schemas.AuthTokensResponse;
}> = async (req, res) => {
  const { email, password, username } = req.body;

  const passwordHash = await hash(password);

  // onConflictDoNothing пропускает вставку при конфликте уникальности по указанному target.
  // В этом случае returning возвращает пустой массив, и мы выбрасываем ошибку 409,
  // чтобы откатить всю транзакцию. Остальные ошибки БД не подавляются.
  const user = await req.server.drizzle.transaction(async (tx) => {
    const [user] = await tx
      .insert(tables.user)
      .values({ email, passwordHash })
      .onConflictDoNothing({ target: tables.user.email })
      .returning({ id: tables.user.id });

    if (!user) {
      throw req.server.httpErrors.conflict("Email is already registered");
    }

    const [userProfile] = await tx
      .insert(tables.profile)
      .values({ userId: user.id, username })
      .onConflictDoNothing({ target: tables.profile.username })
      .returning({ userId: tables.profile.userId });

    if (!userProfile) {
      throw req.server.httpErrors.conflict("Username is already registered");
    }

    return user;
  });

  const accessToken = req.server.jwt.access.sign({ userId: user.id });
  const refreshToken = req.server.jwt.refresh.sign({ userId: user.id });

  return res.code(201).send({
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: 900,
  });
};

export const login: RouteHandler<{
  Body: contracts.LoginRequest;
  Reply: schemas.AuthTokensResponse;
}> = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await req.server.drizzle
    .select({
      id: tables.user.id,
      passwordHash: tables.user.passwordHash,
    })
    .from(tables.user)
    .where(eq(tables.user.email, email))
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
};

export const refresh: RouteHandler<{
  Reply: schemas.AuthTokensResponse;
}> = async (req, res) => {
  // Это стандартное поле jwt плагина, поэтому используем его.
  const { userId } = req.user;

  const [user] = await req.server.drizzle
    .select({ id: tables.user.id })
    .from(tables.user)
    .where(eq(tables.user.id, userId))
    .limit(1);

  if (!user) {
    throw req.server.httpErrors.unauthorized("Invalid refresh token");
  }

  const accessToken = req.server.jwt.access.sign({ userId: user.id });
  const refreshToken = req.server.jwt.refresh.lookupToken(req);

  return res.code(200).send({
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: 900,
  });
};
