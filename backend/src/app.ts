import { accessTokenConfig, refreshTokenConfig } from "./modules/session/session.config.js";
import fastify, { type FastifyInstance } from "fastify";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { drizzlePlugin } from "./database/drizzle.plugin.js";
import { ENV } from "./config/index.js";
import fastifyJwt from "@fastify/jwt";
import { healthRoutes } from "./modules/health/health.routes.js";
import { metadataRoutes } from "./modules/metadata/metadata.routes.js";
import { registryRoutes } from "./modules/registry/registry.routes.js";
import sensible from "@fastify/sensible";
import { userRoutes } from "./modules/user/user.routes.js";


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

export const registerAppRoutes = (server: FastifyInstance) => {
  server.register(healthRoutes);
  server.register(metadataRoutes, { prefix: "/metadata" });
  server.register(authRoutes, { prefix: "/auth" });
  server.register(registryRoutes, { prefix: "/registry" });
  server.register(userRoutes, { prefix: "/user" });
};
