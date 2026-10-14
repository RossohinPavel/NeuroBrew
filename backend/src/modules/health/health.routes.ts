import * as handlers from "./health.handlers.js";
import { healthErrorResponseSchema, healthOkResponseSchema } from "./health.schema.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const healthRoutes: FastifyPluginAsync = async (server) => {
  server.get("/health", {
    schema: {
      // Describes the operation in generated OpenAPI documentation.
      operationId: "health",
      summary: "Check service health",
      description: "Returns the current health status of the backend service.",
      tags: ["health"],

      // Defines validation schemas for accepted request data.
      // body: GET /health does not accept a request body.
      // querystring: GET /health does not accept query parameters.
      // params: GET /health does not contain path parameters.
      // headers: GET /health does not require custom headers.

      // Defines serialization schemas for returned responses.
      response: {
        200: toJsonSchema(healthOkResponseSchema, { typeMode: "output", errorMode: "throw" }),
        503: toJsonSchema(healthErrorResponseSchema, { typeMode: "output", errorMode: "throw" }),
      },

      // Configures additional OpenAPI behavior for the operation.
      // hide: The endpoint should be included in the OpenAPI documentation.
      // deprecated: The endpoint is not deprecated.
      // consumes: GET /health does not accept request content.
      // produces: The response content type is inferred from the response schema.
      // externalDocs: There is no external documentation for this endpoint.
      // security: The health check does not require authorization.
    },
  }, handlers.getHealthStatus);
};
