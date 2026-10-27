import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const projectRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    preHandler: async (req) => req.query.mine ? await requireAccessToken(req) : undefined,
    schema: {
      operationId: "getProjects",
      summary: "Get projects",
      description: "Lists projects by username; mine=true requires a token and returns yours.",
      tags: ["project"],
      security: [{}, { bearerAuth: [] }],
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
