import fastify, { type FastifyInstance } from "fastify";
import { ENV } from "./config/index.js";
import { healthRoutes } from "./modules/health/health.routes.js";


export const app = fastify({
  logger: ENV.NODE_ENV !== "development" ? true : {
    transport: {
      target: "@fastify/one-line-logger",
      options: { customTimeFormat: "yyyy-mm-dd HH:MM:ss" },
    },
  },
});

export const registerAppRoutes = (server: FastifyInstance) => {
  server.register(healthRoutes);
};
