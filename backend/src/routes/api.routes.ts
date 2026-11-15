import { authRoutes } from "./auth/routes.js";
import { changelogRoutes } from "./changelog/routes.js";
import type { FastifyPluginAsync } from "fastify";
import { fileRoutes } from "./file/routes.js";
import { healthRoutes } from "./health/routes.js";
import { projectRoutes } from "./project/routes.js";
import { userRoutes } from "./user/routes.js";


// Подключает разделы API с их маршрутными префиксами.
export const apiRoutes: FastifyPluginAsync = async (server) => {
  server.register(healthRoutes, { prefix: "/health" });
  server.register(changelogRoutes, { prefix: "/metadata.changelog" });
  server.register(authRoutes, { prefix: "/auth" });
  server.register(userRoutes, { prefix: "/user" });
  server.register(projectRoutes, { prefix: "/project" });
  server.register(fileRoutes, { prefix: "/file" });
};
