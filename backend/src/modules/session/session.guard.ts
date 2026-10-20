import type { FastifyRequest } from "fastify";
import type { JwtVerifyFunction } from "@fastify/jwt";


declare module "fastify" {
  interface FastifyRequest {
    accessJwtVerify: JwtVerifyFunction;
    refreshJwtVerify: JwtVerifyFunction;
  }
}

type SessionGuard = (
  request: Pick<FastifyRequest, "accessJwtVerify" | "refreshJwtVerify">,
) => Promise<void>;

export const requireAccessToken: SessionGuard = async (request) => {
  await request.accessJwtVerify();
};

export const requireRefreshToken: SessionGuard = async (request) => {
  await request.refreshJwtVerify();
};
