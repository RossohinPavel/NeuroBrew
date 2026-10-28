import * as contracts from "@shared/contracts";
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

  server.post("/", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "createProject",
      summary: "Create a project",
      description: "Creates a project for the authenticated user.",
      tags: ["project"],
      security: [{ bearerAuth: [] }],
      body: toJsonSchema(
        contracts.CreateProjectRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        201: toJsonSchema(
          schemas.projectResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        409: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.createProject);

  server.get("/lookup", {
    schema: {
      operationId: "lookupProject",
      summary: "Lookup project",
      description: "Looks up a project by username and project name.",
      tags: ["project"],
      querystring: toJsonSchema(
        schemas.projectLookupQuerySchema,
        { typeMode: "input", errorMode: "throw" },
      ),
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
  }, handlers.lookupProject);
};
