import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import { createIdParamsSchema } from "../../schemas/index.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const projectRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    schema: {
      operationId: "getProjects",
      summary: "Get projects",
      description: "Returns projects for the specified profile.",
      tags: ["project"],
      params: createIdParamsSchema("profileId"),
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
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getProjects);

  server.get("/:id", {
    schema: {
      operationId: "getProject",
      summary: "Get a project",
      description: "Returns a project by ID.",
      tags: ["project"],
      params: createIdParamsSchema("profileId", "id"),
      response: {
        200: toJsonSchema(
          schemas.projectResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getProject);

};
