import * as contracts from "@shared/contracts";
import * as handlers from "./handlers.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const agentsmdRoutes: FastifyPluginAsync = async (server) => {
  server.post(".get", {
    schema: {
      operationId: "getAgentsmd",
      summary: "Get AGENTS.md",
      description: "Returns an AGENTS.md document by username and project name.",
      tags: ["agentsmd"],
      body: toJsonSchema(
        contracts.AgentsmdGetRequestSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          contracts.AgentsmdResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getAgentsmd);
};
