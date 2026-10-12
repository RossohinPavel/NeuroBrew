import { Controller, Get } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import { AppService, HealthJsonSchema } from "./app.service.js";


@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get("health")
  @RouteSchema({
    response: {
      200: HealthJsonSchema,
    },
  })
  getHealth() {
    return this.service.health();
  }
}
