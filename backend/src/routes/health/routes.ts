import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


// Придерживаемся спецификации: RFC 8663.
export const healthRoutes: FastifyPluginAsync = async (server) => {

  // Это упрощеный live запрос. Отвечат на вопрос - живы ли сервисы или нет. 
  // При чем, этот ответ именно для стороннего сервиса. Т.е. даже если процесс запущен, но
  // намертво завис (например, застрял в вечном цикле) - то мы считаем, что этот сервис мертв.
  server.get("/", {
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
        200: toJsonSchema(schemas.LiveResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        503: toJsonSchema(schemas.LiveResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
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

  // Есть еще ready запрос. Отвечает на вопрос - может ли этот сервис работать - т.е. принимать
  // запросы. Предоставляет более детальную информацию, которую может использовать балансировщик.
  // Он пока не реализован))
};
