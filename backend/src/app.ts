import { accessTokenConfig, refreshTokenConfig } from "./modules/session/session.config.js";
import fastify, { type FastifyInstance } from "fastify";
import * as routes from "./modules/index.js";
import { drizzlePlugin } from "./database/drizzle.plugin.js";
import { ENV } from "./config/index.js";
import fastifyJwt from "@fastify/jwt";
import sensible from "@fastify/sensible";


export const app = fastify({
  logger: ENV.NODE_ENV !== "development" ? true : {
    transport: {
      target: "@fastify/one-line-logger",
      options: { customTimeFormat: "yyyy-mm-dd HH:MM:ss" },
    },
  },
});

app.register(drizzlePlugin, { url: ENV.DATABASE_URL });
app.register(fastifyJwt, accessTokenConfig);
app.register(fastifyJwt, refreshTokenConfig);
app.register(sensible, { sharedSchemaId: "HttpError" });

// Все модули роутов регистрируем здесь плоско, без вложенных регистраций друг в друга.
export const registerAppRoutes = (server: FastifyInstance) => {
  server.register(routes.healthRoutes, { prefix: "/health" });
  server.register(routes.metadataRoutes, { prefix: "/metadata" });
  server.register(routes.authRoutes, { prefix: "/auth" });
  server.register(routes.projectRoutes, { prefix: "/project" });
  server.register(routes.agentsmdRoutes, { prefix: "/project/:projectId/agents" });
  server.register(routes.userRoutes, { prefix: "/user" });
};
