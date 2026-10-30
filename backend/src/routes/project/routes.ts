import * as contracts from "@shared/contracts";
import * as handlers from "./handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const projectRoutes: FastifyPluginAsync = async (server) => {
  server.post(".get", {
    schema: {
      operationId: "getProject",
      summary: "Get a project",
      description: "Returns a project by username and project name.",
      tags: ["project"],
      body: toJsonSchema(
        contracts.ProjectGetRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          contracts.ProjectResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getProject);

  server.post(".list", {
    preHandler: async (req) => req.body.mine ? await requireAccessToken(req) : undefined,
    schema: {
      operationId: "listProjects",
      summary: "List projects",
      description: "Lists projects by username; mine=true requires a token and returns the authenticated user's projects.",
      tags: ["project"],
      security: [{}, { bearerAuth: [] }],
      body: toJsonSchema(
        contracts.ProjectListRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          contracts.ProjectListResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.listProjects);

  server.post(".create", {
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
          contracts.ProjectResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        409: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.createProject);
};
