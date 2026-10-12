import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import { HealthJsonSchema, HealthService } from "./health.service.js";


@Controller({
  path: "health",
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get()
  @RouteSchema({
    response: {
      200: HealthJsonSchema,
    },
  })
  getHealth() {
    return this.service.health();
  }
}
