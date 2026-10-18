import * as handlers from "./metadata.handlers.js";
import { changelogResponseSchema } from "./metadata.schema.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const metadataRoutes: FastifyPluginAsync = async (server) => {
  server.get("/changelog", {
    schema: {
      operationId: "getChangelog",
      summary: "Get changelog",
      description: "Returns the application changelog.",
      tags: ["metadata"],
      response: {
        200: toJsonSchema(changelogResponseSchema, { typeMode: "output", errorMode: "throw" }),
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getChangelog);
};
