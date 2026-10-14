import { ENV, LOGGER_CONFIG } from "./config/index.js";
import fastify, { type FastifyInstance } from "fastify";
import { healthRoutes } from "./modules/health/health.routes.js";


export const app = fastify({
  logger: ENV.NODE_ENV === "development" ? LOGGER_CONFIG : true,
});

export const registerAppRoutes = (server: FastifyInstance) => {
  server.register(healthRoutes);
};
