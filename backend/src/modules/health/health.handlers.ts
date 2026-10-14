import type { FastifyReply, FastifyRequest } from "fastify";
import type { HealthResponse } from "./health.schema.js";
import { sql } from "drizzle-orm";


export const getHealthStatus = async (
  req: FastifyRequest,
  res: FastifyReply,
): Promise<HealthResponse> => {
  try {
    await req.server.drizzle.execute(sql`select 1`);
    return {
      status: "ok",
      services: {
        backend: "ok",
        postgres: "ok",
      },
    };
  } catch (error) {
    req.log.error(error, "PostgreSQL health check failed");
    res.code(503);
    return {
      status: "error",
      services: {
        backend: "ok",
        postgres: "error",
      },
    };
  }
};
