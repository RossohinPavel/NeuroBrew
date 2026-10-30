import * as contracts from "@shared/contracts";
import * as handlers from "./handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const metadataRoutes: FastifyPluginAsync = async (server) => {
  server.post(".changelog.list", {
    schema: {
      operationId: "listChangelog",
      summary: "List changelog entries",
      description: "Returns the application changelog.",
      tags: ["metadata"],
      response: {
        200: toJsonSchema(contracts.ChangelogListResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.listChangelog);
};
