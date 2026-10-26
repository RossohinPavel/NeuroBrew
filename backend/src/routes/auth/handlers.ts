import type * as contracts from "@shared/contracts";
import type * as schemas from "./schemas.js";
import * as tables from "../../database/schema/index.js";
import { hash, verify } from "argon2";
import { eq } from "drizzle-orm";
import type { RouteHandler } from "fastify";


/*
 * На уровне хендлера роута ошибки делим на ожидаемые и неожиданные.
 *
 * Неожиданные ошибки, а также любые ошибки, которые мы явно не обработали,
 * доверяем стандартному обработчику Fastify. Поэтому в общем случае блок
 * `try/catch` в хендлере излишен. Fastify логирует ошибку и формирует
 * ответ. Для ошибки без HTTP-статуса Fastify возвращает `500`. Исходное
 * сообщение ошибки по умолчанию попадает в ответ клиенту.
 * При необходимости на уровне роута, плагина или сервера можно задать
 * обработчик ошибок, который будет маскировать внутренние сообщения бэкенда.
 *
 * Ожидаемую ошибку можем сформировать сами: создаем HTTP-ошибку соответствующей
 * утилитой `@fastify/sensible` и выбрасываем ее через `throw`. Например:
 * `throw req.server.httpErrors.unauthorized("Invalid email or password")`.
 * Fastify обработает ее и отправит клиенту заданные HTTP-статус и сообщение.
 *
 * Может понадобиться дополнительная работа с ошибкой хендлера. Ее можно
 * организовать централизованно: через `onError` для наблюдения за ошибками
 * или обработчик ошибок для их преобразования. Локально используем `try/catch`.
 * При этом следуем тому же подходу EAFP, что и при передаче ошибок Fastify:
 * проще попросить прощения, чем разрешения. Сначала выполняем операцию,
 * а при отказе распознаем ошибку и обрабатываем ее по бизнес-логике.
 * Нераспознанные ошибки повторно выбрасываем без дополнительного логирования.
 * Оборачивать весь хендлер только ради логирования и повторного `throw` не нужно.
 * И `throw` HTTP-ошибки, и reply-хелпер `@fastify/sensible` передают ошибку
 * обработчику Fastify; выбор между ними не отключает стандартное логирование.
 *
 * Все возможные HTTP-ответы должны быть перечислены в OpenAPI-схеме роута.
 * Если хендлер вернет, например, `403`, но схема его не описывает, сгенерированный
 * клиент не узнает об этом статусе и не сможет корректно учесть его в типах.
 */


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
