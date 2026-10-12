import { Controller, Get } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import { HealthJsonSchema } from "./health.schema.js";
import { HealthService } from "./health.service.js";


@Controller("health")
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get()
  @RouteSchema({
    operationId: "health",
    response: {
      200: HealthJsonSchema,
    },
  })
  getHealth() {
    return this.service.health();
  }
}
