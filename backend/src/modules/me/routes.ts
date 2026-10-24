import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const meRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "me",
      summary: "Get current user",
      description: "Returns the currently authenticated user.",
      tags: ["me"],
      security: [{ bearerAuth: [] }],
      response: {
        200: toJsonSchema(schemas.meResponseSchema, {
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
