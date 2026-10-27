import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const userRoutes: FastifyPluginAsync = async (server) => {
  server.get("/lookup", {
    schema: {
      operationId: "lookupUser",
      summary: "Look up a user",
      description: "Returns a user by username.",
      tags: ["user"],
      querystring: toJsonSchema(
        schemas.UserLookupQuerySchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          schemas.UserResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.lookupUser);

  server.get("/me", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "me",
      summary: "Get current user",
      description: "Returns the currently authenticated user.",
      tags: ["me"],
      security: [{ bearerAuth: [] }],
      response: {
        200: toJsonSchema(schemas.UserResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getMe);
};
