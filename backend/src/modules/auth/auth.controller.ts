import { Body, Controller, Get, Post } from "@nestjs/common";
import { RouteSchema } from "@nestjs/platform-fastify";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  type LoginRequest,
  type RegisterRequest,
} from "@shared/contracts";
import { toJsonSchema } from "@valibot/to-json-schema";
import { RegisterResponseSchema } from "./auth.schema.js";
import { AuthService } from "./auth.service.js";


@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("register")
  @RouteSchema({
    operationId: "register",
    summary: "Register a user",
    description: "Creates a new user account.",
    tags: ["auth"],
    body: toJsonSchema(RegisterRequestSchema, { typeMode: "input", errorMode: "throw" }),
    response: {
      201: toJsonSchema(RegisterResponseSchema, { typeMode: "output", errorMode: "throw" }),
    },
  })
  register(@Body() request: RegisterRequest) {
    return this.service.register(request);
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
