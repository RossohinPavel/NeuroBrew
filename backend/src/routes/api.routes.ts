import { agentsmdRoutes } from "./agentsmd/routes.js";
import { authRoutes } from "./auth/routes.js";
import type { FastifyPluginAsync } from "fastify";
import { healthRoutes } from "./health/routes.js";
import { metadataRoutes } from "./metadata/routes.js";
import { projectRoutes } from "./project/routes.js";
import { userRoutes } from "./user/routes.js";


// Подключает разделы API с их маршрутными префиксами.
export const apiRoutes: FastifyPluginAsync = async (server) => {
  server.register(healthRoutes, { prefix: "/health" });
  server.register(metadataRoutes, { prefix: "/metadata" });
  server.register(authRoutes, { prefix: "/auth" });
  server.register(userRoutes, { prefix: "/user" });
  server.register(projectRoutes, { prefix: "/project" });
  server.register(agentsmdRoutes, { prefix: "/profile/:profileId/project/:projectId/agents" });
};
