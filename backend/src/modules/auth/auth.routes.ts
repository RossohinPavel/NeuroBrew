import * as handlers from "./auth.handlers.js";
import { authTokensResponseSchema } from "./auth.schema.js";
import { LoginRequestSchema, RegisterRequestSchema } from "@shared/contracts";
import { toJsonSchema } from "@valibot/to-json-schema";
import type { FastifyPluginAsync } from "fastify";


export const authRoutes: FastifyPluginAsync = async (server) => {
  server.post("/register", {
    schema: {
      operationId: "register",
      summary: "Register a user",
      description: "Creates a new user account.",
      tags: ["auth"],
      body: toJsonSchema(RegisterRequestSchema, { typeMode: "input", errorMode: "throw" }),
      response: { 
        201: toJsonSchema(authTokensResponseSchema, { typeMode: "output", errorMode: "throw" }) 
      },
    },
  }, handlers.register);

  server.post("/login", {
    schema: {
      operationId: "login",
      summary: "Log in a user",
      description: "Authenticates a user and starts a new session.",
      tags: ["auth"],
      body: toJsonSchema(LoginRequestSchema, { typeMode: "input", errorMode: "throw" }),
      response: {
        200: toJsonSchema(authTokensResponseSchema, { typeMode: "output", errorMode: "throw" })
      },
    },
  }, handlers.login);

  server.post("/refresh", {
    schema: {
      operationId: "refresh",
      summary: "Refresh authentication",
      description: "Renews authentication for the current session.",
      tags: ["auth"],
    },
  }, handlers.refresh);

  server.post("/logout", {
    schema: {
      operationId: "logout",
      summary: "Log out a user",
      description: "Ends the current user session.",
      tags: ["auth"],
    },
  }, handlers.logout);
};
