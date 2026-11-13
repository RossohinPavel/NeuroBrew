import * as contracts from "@shared/contracts";
import * as handlers from "./handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const fileRoutes: FastifyPluginAsync = async (server) => {
  server.post(".get", {
    schema: {
      operationId: "getFile",
      summary: "Get a file",
      description: "Returns a file by username, project name and file name.",
      tags: ["file"],
      body: toJsonSchema(
        contracts.GetFileRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          contracts.FileResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getFile);

  server.post(".list", {
    schema: {
      operationId: "listFiles",
      summary: "List files",
      description: "Lists files in a project by username and project name.",
      tags: ["file"],
      body: toJsonSchema(
        contracts.ListFilesRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          contracts.ListFilesResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.listFiles);

  server.post(".create", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "createFile",
      summary: "Create a file",
      description: "Creates a file in a project owned by the authenticated user.",
      tags: ["file"],
      security: [{ bearerAuth: [] }],
      body: toJsonSchema(
        contracts.CreateFileRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        201: toJsonSchema(
          contracts.FileResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        409: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.createFile);
};
