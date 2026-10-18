import * as handlers from "./registry.handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { myProjectsResponseSchema } from "./registry.schema.js";
import { requireAccessToken } from "../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const registryRoutes: FastifyPluginAsync = async (server) => {
  server.get("/my-project", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "getMyProjects",
      summary: "Get my projects",
      description: "Returns the current user's projects.",
      tags: ["registry"],
      security: [{ bearerAuth: [] }],
      response: {
        200: toJsonSchema(myProjectsResponseSchema, { typeMode: "output", errorMode: "throw" }),
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getMyProjects);
};
