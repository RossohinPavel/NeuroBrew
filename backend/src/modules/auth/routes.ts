import * as handlers from "./handlers.js";
import * as schemas from "./schemas.js";
import * as contracts from "@shared/contracts";
import { requireAccessToken, requireRefreshToken } from "../session/session.guard.js";
import type { FastifyPluginAsync } from "fastify";
import { toJsonSchema } from "@valibot/to-json-schema";


export const authRoutes: FastifyPluginAsync = async (server) => {
  server.post("/register", {
    schema: {
      operationId: "register",
      summary: "Register a user",
      description: "Creates a new user account.",
      tags: ["auth"],
      body: toJsonSchema(contracts.RegisterRequestSchema, {
        typeMode: "input",
        errorMode: "throw",
      }),
      response: { 
        201: toJsonSchema(schemas.authTokensResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        409: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.register);

  server.post("/login", {
    schema: {
      operationId: "login",
      summary: "Log in a user",
      description: "Authenticates a user and starts a new session.",
      tags: ["auth"],
      body: toJsonSchema(contracts.LoginRequestSchema, {
        typeMode: "input",
        errorMode: "throw",
      }),
      response: {
        200: toJsonSchema(schemas.authTokensResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.login);

  server.post("/refresh", {
    onRequest: requireRefreshToken,
    schema: {
      operationId: "refresh",
      summary: "Refresh authentication",
      description: "Renews authentication for the current session.",
      tags: ["auth"],
      security: [{ bearerAuth: [] }],
      response: {
        200: toJsonSchema(schemas.authTokensResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.refresh);

  server.get("/me", {
    onRequest: requireAccessToken,
    schema: {
      operationId: "me",
      summary: "Get current user",
      description: "Returns the currently authenticated user.",
      tags: ["auth"],
      security: [{ bearerAuth: [] }],
      response: {
        200: toJsonSchema(schemas.meResponseSchema, {
          typeMode: "output",
          errorMode: "throw",
        }),
        400: { $ref: "HttpError" },
        401: { $ref: "HttpError" },
        500: { $ref: "HttpError" },
      },
    },
  }, handlers.me);

};
