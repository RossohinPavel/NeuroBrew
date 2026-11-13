import { accessTokenConfig, refreshTokenConfig } from "./session/session.config.js";
import { apiRoutes } from "./routes/api.routes.js";
import { drizzlePlugin } from "./database/drizzle.plugin.js";
import { ENV } from "./config/index.js";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyRedis from "@fastify/redis";
import sensible from "@fastify/sensible";


const app = fastify({
  logger: ENV.NODE_ENV !== "development" ? true : {
    transport: {
      target: "@fastify/one-line-logger",
      options: { customTimeFormat: "yyyy-mm-dd HH:MM:ss" },
    },
  },
});

app.register(fastifyRedis, {
  url: ENV.REDIS_URL,
  keyPrefix: "backend:",
});
app.register(drizzlePlugin, { url: ENV.DATABASE_URL });
app.register(fastifyJwt, accessTokenConfig);
app.register(fastifyJwt, refreshTokenConfig);
app.register(sensible, { sharedSchemaId: "HttpError" });
app.register(apiRoutes);


try {
  await app.listen({
    host: "0.0.0.0",
    port: 8080,
  });
} catch (error) {
  app.log.error(error);

  process.exit(1);
}
