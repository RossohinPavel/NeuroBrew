import { Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";


@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("register")
  register() {
    return this.service.register();
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  login() {
    return this.service.login();
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refresh() {
    return this.service.refresh();
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  logout() {
    return this.service.logout();
  }

  @Get("me")
  me() {
    return this.service.me();
  }
}
