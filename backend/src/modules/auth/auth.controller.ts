import { Controller, Get, Post } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
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
  @RouteSchema({ operationId: "login" })
  login() {
    return this.service.login();
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
