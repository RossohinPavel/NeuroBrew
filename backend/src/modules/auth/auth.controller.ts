import { Body, Controller, Get, Post } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import { LoginRequestSchema, type LoginRequest } from "@shared/contracts";
import { toJsonSchema } from "@valibot/to-json-schema";
import { AuthService } from "./auth.service.js";


@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("register")
  @RouteSchema({ operationId: "register" })
  register() {
    return this.service.register();
  }

  @Post("login")
  @RouteSchema({
    operationId: "login",
    body: toJsonSchema(LoginRequestSchema, { typeMode: "input", errorMode: "throw" }),
  })
  login(@Body() request: LoginRequest) {
    return this.service.login(request);
  }

  @Post("refresh")
  @RouteSchema({ operationId: "refresh" })
  refresh() {
    return this.service.refresh();
  }

  @Post("logout")
  @RouteSchema({ operationId: "logout" })
  logout() {
    return this.service.logout();
  }

  @Get("me")
  @RouteSchema({ operationId: "me" })
  me() {
    return this.service.me();
  }
}
