import "server-only";

import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { createClient } from "redis";
import { ENV } from "@/shared/env";
import type { RedisClientType } from "redis";


const CONNECT_TIMEOUT_MS = 1000;

/** Создаёт функцию доступа к клиенту вне фазы производственной сборки. */
const createClientGetter = (client: RedisClientType) => {
  const connection = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
    ? Promise.resolve()
    : client.connect().catch(error => {
      // eslint-disable-next-line no-console
      console.warn("Failed to connect to Redis:", error);
    });

  // Ограничиваем ожидание: Redis продолжит попытки подключения в фоне.
  const ready = Promise.race([
    connection,
    // Таймер не удерживает процесс при завершении работы.
    new Promise<void>(resolve => setTimeout(resolve, CONNECT_TIMEOUT_MS).unref()),
  ]);

  return async () => {
    await ready;
    return client.isReady ? client : undefined;
  };
};

/** Клиент Redis для кеша и обычных команд серверного кода. */
const Redis = createClient({
  url: ENV.REDIS_URL,
  keyPrefix: "frontend:",
  // Не откладываем команды до восстановления соединения.
  disableOfflineQueue: true,
});

Redis.on("error", error => {
  // eslint-disable-next-line no-console
  console.error("Redis client error:", error);
});

/** Возвращает клиент Redis для кеша и обычных команд. */
export const getClient = createClientGetter(Redis);

/** Отдельный клиент Redis для подписки на события. */
const RedisSub = createClient({
  url: ENV.REDIS_URL,
});

RedisSub.on("error", error => {
  // eslint-disable-next-line no-console
  console.error("Redis subscriber error:", error);
});

/** Возвращает клиент Redis для подписки на события. */
export const getSubClient = createClientGetter(RedisSub);
