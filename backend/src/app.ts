import fastify, { type FastifyInstance } from "fastify";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { drizzlePlugin } from "./database/drizzle.plugin.js";
import { ENV } from "./config/index.js";
import fastifyJwt from "@fastify/jwt";
import { healthRoutes } from "./modules/health/health.routes.js";


declare module "@fastify/jwt" {
  interface FastifyJWT {
    namespaces: "access" | "refresh";
    payload: { userId: number };
  }
}

export const app = fastify({
  logger: ENV.NODE_ENV !== "development" ? true : {
    transport: {
      target: "@fastify/one-line-logger",
      options: { customTimeFormat: "yyyy-mm-dd HH:MM:ss" },
    },
  },
});

app.register(drizzlePlugin, { url: ENV.DATABASE_URL });

app.register(fastifyJwt, {
  secret: ENV.JWT_ACCESS_SECRET,
  namespace: "access",
  sign: { expiresIn: "15m" },
});

app.register(fastifyJwt, {
  secret: ENV.JWT_REFRESH_SECRET,
  namespace: "refresh",
  sign: { expiresIn: "30d" },
});

export const registerAppRoutes = (server: FastifyInstance) => {
  server.register(authRoutes, { prefix: "/auth" });
  server.register(healthRoutes);
};
