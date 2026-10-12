import { Controller, Get, Post } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import { AuthService } from "./auth.service.js";


@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("register")
  @RouteSchema({ operationId: "registerV1" })
  register() {
    return this.service.register();
  }

  @Post("login")
  @RouteSchema({ operationId: "loginV1" })
  login() {
    return this.service.login();
  }

  @Post("refresh")
  @RouteSchema({ operationId: "refreshV1" })
  refresh() {
    return this.service.refresh();
  }

  @Post("logout")
  @RouteSchema({ operationId: "logoutV1" })
  logout() {
    return this.service.logout();
  }

  @Get("me")
  @RouteSchema({ operationId: "meV1" })
  me() {
    return this.service.me();
  }
}
