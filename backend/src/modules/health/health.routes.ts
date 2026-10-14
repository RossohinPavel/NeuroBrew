import * as handlers from "./health.handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { healthResponseSchema } from "./health.schema.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const healthRoutes: FastifyPluginAsync = async (server) => {
  server.get("/health", {
    schema: {
      response: {
        200: toJsonSchema(healthResponseSchema, { typeMode: "output", errorMode: "throw" }),
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
