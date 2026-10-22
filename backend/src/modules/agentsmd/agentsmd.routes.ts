import * as handlers from "./agentsmd.handlers.js";
import * as schemas from "./agentsmd.schema.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const agentsmdRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    schema: {
      operationId: "getAgentsmdList",
      summary: "Get AGENTS.md list",
      description: "Returns a list of AGENTS.md records, optionally filtered by project ID.",
      tags: ["agentsmd"],
      querystring: toJsonSchema(
        schemas.agentsmdListQuerySchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          schemas.agentsmdListResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getAgentsmdList);
};
