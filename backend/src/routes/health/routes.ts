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
      operationId: "health",
      summary: "Check service health",
      description: "Returns the current health status of the backend service.",
      tags: ["health"],

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
    },
  }, handlers.getHealthStatus);

  // Есть еще ready запрос. Отвечает на вопрос - может ли этот сервис работать - т.е. принимать
  // запросы. Предоставляет более детальную информацию, которую может использовать балансировщик.
  // Он пока не реализован))
};
