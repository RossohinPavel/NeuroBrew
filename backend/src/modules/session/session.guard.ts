import type { JwtVerifyFunction } from "@fastify/jwt";
import type { onRequestHookHandler } from "fastify";


declare module "fastify" {
  interface FastifyRequest {
    accessJwtVerify: JwtVerifyFunction;
    refreshJwtVerify: JwtVerifyFunction;
  }
}

export const requireAccessToken: onRequestHookHandler = async (request) => {
  await request.accessJwtVerify();
};

export const requireRefreshToken: onRequestHookHandler = async (request) => {
  await request.refreshJwtVerify();
};
