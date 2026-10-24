import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const myProjectRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "getMyProjects",
      summary: "Get my projects",
      description: "Returns projects for the currently authenticated account.",
      tags: ["my-project"],
      security: [{ bearerAuth: [] }],
      querystring: toJsonSchema(
        schemas.projectsQuerySchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          schemas.projectsResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getProjects);
};
