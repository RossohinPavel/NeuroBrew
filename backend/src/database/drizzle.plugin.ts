import { drizzle as createDrizzle } from "drizzle-orm/postgres-js";
import fastifyPlugin from "fastify-plugin";


export interface DrizzlePluginOptions {
  url: string;
}

/*
 * Расширяет тип FastifyInstance, чтобы TypeScript знал о декораторе drizzle.
 * Декларация влияет только на проверку типов и не создает свойство во время выполнения.
 * Если плагин не зарегистрирован, обращение к server.drizzle скомпилируется,
 * но приведет к ошибке во время выполнения.
 */
declare module "fastify" {
  interface FastifyInstance {
    drizzle: ReturnType<typeof createDrizzle>;
  }
}

/*
 * Создает Drizzle по переданному URL и добавляет его в Fastify как server.drizzle.
 * Обертка fastify-plugin делает декоратор доступным другим плагинам и маршрутам.
 * Плагин нужно зарегистрировать до потребителей декоратора.
 * При закрытии Fastify хук завершает соединения с PostgreSQL.
 */
export const drizzlePlugin = fastifyPlugin<DrizzlePluginOptions>(
  async (server, options) => {
    const drizzle = createDrizzle(options.url);
    server.decorate("drizzle", drizzle);
    server.addHook("onClose", async () => {
      await drizzle.$client.end();
    });
  },
  { name: "drizzle" },
);
