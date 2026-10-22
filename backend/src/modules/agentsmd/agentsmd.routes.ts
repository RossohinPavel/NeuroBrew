import * as handlers from "./agentsmd.handlers.js";
import * as schemas from "./agentsmd.schema.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const agentsmdRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", {
    schema: {
      operationId: "getAgentsmd",
      summary: "Get AGENTS.md",
      description: "Returns the AGENTS.md for the specified project.",
      tags: ["agentsmd"],
      params: toJsonSchema(
        schemas.agentsmdParamsSchema,
        { typeMode: "input", errorMode: "throw" },
      ),
      response: {
        200: toJsonSchema(
          schemas.agentsmdResponseSchema,
          { typeMode: "output", errorMode: "throw" },
        ),
        400: { $ref: "HttpError" },
        404: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.getAgentsmd);
};
