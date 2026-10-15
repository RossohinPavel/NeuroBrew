import type { HealthErrorResponse, HealthOkResponse } from "./health.schema.js";
import type { RouteHandler } from "fastify";
import { sql } from "drizzle-orm";


type HealthRouteHandler = RouteHandler<{
  Reply: {
    200: HealthOkResponse;
    503: HealthErrorResponse;
  };
}>;

export const getHealthStatus: HealthRouteHandler = async (req, res) => {
  const services = { backend: "ok", postgres: "ok" } as const;
  try {
    await req.server.drizzle.execute(sql`select 1`);
    return res.code(200).send({
      status: "ok",
      services,
    });
  } catch (error) {
    req.log.error(error, "PostgreSQL health check failed");
    return res.code(503).send({
      status: "error",
      services: { ...services, postgres: "error" },
    });
  }
};
