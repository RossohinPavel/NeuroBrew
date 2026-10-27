import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const agentsmdRoutes: FastifyPluginAsync = async (server) => {
  server.get("/lookup", {
    schema: {
      operationId: "lookupAgentsmd",
      summary: "Lookup AGENTS.md",
      description: "Looks up an AGENTS.md document by username and project name.",
      tags: ["agentsmd"],
      querystring: toJsonSchema(
        schemas.agentsmdLookupQuerySchema,
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
  }, handlers.lookupAgentsmd);
};
