import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { requireAccessToken } from "../../session/session.guard.js";
import { toJsonSchema } from "@valibot/to-json-schema";


/*
server.get("/", ...);
server.get("/search", ...);
server.get("/me", ...);
server.get("/:id", ...);
server.put("/:id", ...);
server.patch("/:id", ...);
server.delete("/:id", ...);
server.get("/:id/posts", ...);
server.post("/:id/posts", ...);
*/

export const userRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    schema: {
      operationId: "getUsers",
      tags: ["user"],
      querystring: toJsonSchema(
        schemas.UsersQuerySchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          schemas.UsersResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getUsers);

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
