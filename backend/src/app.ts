import { ENV, LOGGER_CONFIG } from "./config/index.js";
import fastify from "fastify";
import { healthRoutes } from "./modules/health/health.routes.js";


export const buildApp = () => {
  const server = fastify({
    logger: ENV.NODE_ENV === "development" ? LOGGER_CONFIG : true,
  });

  server.register(healthRoutes);

  return server;
};
