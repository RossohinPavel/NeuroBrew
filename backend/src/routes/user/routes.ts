import * as contracts from "@shared/contracts";
import * as handlers from "./handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const userRoutes: FastifyPluginAsync = async (server) => {
  server.get(".get", {
    schema: {
      operationId: "getUser",
      summary: "Get a user",
      description: "Returns a user by username.",
      tags: ["user"],
      querystring: toJsonSchema(
        contracts.UserGetQuerySchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          contracts.UserResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getUser);
};
