import { Controller, Get } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import { toJsonSchema } from "@valibot/to-json-schema";
import { AppService, HealthSchema } from "./app.service.js";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @RouteSchema({
    response: {
      200: toJsonSchema(HealthSchema),
    },
  })
  getHealth() {
    return this.appService.health();
  }
}
