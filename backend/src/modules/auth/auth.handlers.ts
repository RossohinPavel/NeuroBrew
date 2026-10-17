import * as schema from "../../database/schema/index.js";
import type { AuthTokensResponse, MeResponse } from "./auth.schema.js";
import { hash, verify } from "argon2";
import type { LoginRequest, RegisterRequest } from "@shared/contracts";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


/*
 * Логику каждого хендлера выполняем внутри `try/catch`. Это особенно важно для
 * критических операций, например создания пользователя.
 *
 * Ошибки делим на ожидаемые и неожиданные. Неожиданные ошибки логируем в `catch`
 * и повторно выбрасываем. Ошибки без HTTP-статуса Fastify вернет как `500`.
 * Пока бэкенд приватный, исходную ошибку можно не маскировать. Перед публикацией
 * ее можно скрыть глобальным обработчиком за стандартным `Internal Server Error`.
 *
 * Ожидаемые ошибки создаем или распознаем внутри хендлера. Если их нужно
 * логировать, выбрасываем через `throw`; если нет — возвращаем reply-хелпер
 * `@fastify/sensible`.
 *
 * Все возможные HTTP-ответы должны быть перечислены в OpenAPI-схеме роута.
 * Если хендлер вернет, например, `403`, но схема его не описывает, сгенерированный
 * клиент не узнает об этом статусе и не сможет корректно учесть его в типах.
 */


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
      return res.unauthorized("Invalid email or password");
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

export const refresh: RouteHandler<{
  Reply: AuthTokensResponse;
}> = async (req, res) => {
  try {
    const { userId } = req.user;

    const [user] = await req.server.drizzle
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);

    if (!user) {
      return res.unauthorized("Invalid refresh token");
    }

    const accessToken = req.server.jwt.access.sign({ userId: user.id });
    const refreshToken = req.server.jwt.refresh.lookupToken(req);

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

export const me: RouteHandler<{
  Reply: MeResponse;
}> = async (req, res) => {
  try {
    const { userId } = req.user;

    const [user] = await req.server.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        username: schema.users.username,
        createdAt: schema.users.createdAt,
      })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);

    if (!user) {
      return res.unauthorized("Invalid access token");
    }

    return res.code(200).send({
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
    });
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};
