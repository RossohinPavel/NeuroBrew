import { Controller, Get } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import { toJsonSchema } from "@valibot/to-json-schema";
import { HealthSchema } from "./health.schema.js";
import { HealthService } from "./health.service.js";


@Controller("health")
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get()
  @RouteSchema({
    // Задает уникальный идентификатор операции в OpenAPI.
    operationId: "health",
    // Показывает краткое название эндпоинта в документации.
    summary: "Check service health",
    // Объясняет назначение эндпоинта в документации.
    description: "Returns the health of the backend and its database connection.",
    // Объединяет эндпоинт с другими операциями проверки состояния.
    tags: ["health"],
    // Валидирует и сериализует ответы отдельно для каждого HTTP-статуса.
    response: {
      200: toJsonSchema(HealthSchema, { typeMode: "output", errorMode: "throw" }),
    },
    // Валидирует тело входящего запроса; GET /health его не принимает.
    // body: {},
    // Валидирует параметры после знака вопроса; у health их нет.
    // querystring: {},
    // Валидирует динамические сегменты пути; в /health их нет.
    // params: {},
    // Валидирует требуемые заголовки запроса; маршрут их не требует.
    // headers: {},
    // Скрывает эндпоинт из сгенерированной OpenAPI-документации.
    // hide: true,
    // Помечает эндпоинт как устаревший в OpenAPI-документации.
    // deprecated: true,
    // Перечисляет MIME-типы тела запроса; используется преимущественно в OpenAPI 2.
    // consumes: ["application/json"],
    // Перечисляет MIME-типы ответа; используется преимущественно в OpenAPI 2.
    // produces: ["application/json"],
    // Добавляет ссылку на внешнюю документацию эндпоинта.
    // externalDocs: { url: "https://example.com" },
    // Указывает схемы авторизации и необходимые разрешения для эндпоинта.
    // security: [{ bearerAuth: [] }],
  })
  getHealth() {
    return this.service.health();
  }
}
