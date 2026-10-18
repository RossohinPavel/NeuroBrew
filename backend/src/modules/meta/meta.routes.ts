import * as handlers from "./meta.handlers.js";
import { changelogResponseSchema } from "./meta.schema.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const metaRoutes: FastifyPluginAsync = async (server) => {
  server.get("/changelog", {
    schema: {
      operationId: "getChangelog",
      summary: "Get changelog",
      description: "Returns the application changelog.",
      tags: ["meta"],
      response: {
        200: toJsonSchema(changelogResponseSchema, { typeMode: "output", errorMode: "throw" }),
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getChangelog);
};
