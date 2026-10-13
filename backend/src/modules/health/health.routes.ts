import * as handlers from "./health.handlers.js";
import type { FastifyPluginAsync } from "fastify";


export const healthRoutes: FastifyPluginAsync = async (server) => {
  server.get("/health", {
    schema: {
      response: {
        200: {
          type: "object",
          additionalProperties: false,
          required: ["status"],
          properties: {
            status: {
              type: "string",
            },
          },
        },
      },
    },
  }, handlers.getHealthStatus);

  server.get("/ping", {
    schema: {
      response: {
        200: {
          type: "string",
        },
      },
    },
  }, handlers.ping);
};
