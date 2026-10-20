import * as handlers from "./project.handlers.js";
import * as schemas from "./project.schema.js";
import { CreateProjectRequestSchema } from "@shared/contracts";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const projectRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    schema: {
      operationId: "getProjects",
      summary: "Get projects",
      description: "Returns projects by username.",
      tags: ["project"],
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
      params: toJsonSchema(
        schemas.projectParamsSchema,
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
  }, handlers.getProject);

  server.post("/", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "createProject",
      summary: "Create a project",
      description: "Creates a project for the current user.",
      tags: ["project"],
      security: [{ bearerAuth: [] }],
      body: toJsonSchema(
        CreateProjectRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        201: toJsonSchema(
          schemas.myProjectResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.createProject);

  server.get("/my", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "getMyProjects",
      summary: "Get my projects",
      description: "Returns the current user's projects.",
      tags: ["project"],
      security: [{ bearerAuth: [] }],
      response: {
        200: toJsonSchema(
          schemas.myProjectsResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getMyProjects);
};
