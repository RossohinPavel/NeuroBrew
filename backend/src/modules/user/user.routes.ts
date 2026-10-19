import * as handlers from "./user.handlers.js";
import * as schemas from "./user.schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


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

  server.get("/:id", {
    schema: {
      operationId: "getUserById",
      tags: ["user"],
      params: toJsonSchema(
        schemas.UserParamsSchema,
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
  }, handlers.getUserById);
};
