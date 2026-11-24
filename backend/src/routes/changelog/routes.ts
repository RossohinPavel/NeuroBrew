import * as contracts from "@shared/contracts";
import * as handlers from "./handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { revalidateFrontendCache } from "../../service/revalidate-frontend-cache.js";
import { toJsonSchema } from "@valibot/to-json-schema";


export const changelogRoutes: FastifyPluginAsync = async (server) => {
  server.post(".list", {
    schema: {
      operationId: "listChangelog",
      summary: "List changelog entries",
      description: "Returns the application changelog.",
      tags: ["metadata"],
      response: {
        200: toJsonSchema(contracts.ListChangelogResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.listChangelog);

  server.post(".create", {
    schema: {
      operationId: "createChangelog",
      summary: "Create a changelog entry",
      description: "Creates an application changelog entry.",
      tags: ["metadata"],
      body: toJsonSchema(
        contracts.CreateChangelogRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        201: toJsonSchema(
          contracts.CreateChangelogResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
    onResponse: async (_, res) => {
      if (res.statusCode === 201) {
        await revalidateFrontendCache(["changelog"]);
      }
    },
  }, handlers.createChangelog);
};
