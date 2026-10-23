import type { LiveResponse } from "./schemas.js";
import type { RouteHandler } from "fastify";
import { sql } from "drizzle-orm";


export const getHealthStatus: RouteHandler<{
  Reply: {
    200: LiveResponse;
    503: LiveResponse;
  };
}> = async (req, res) => {
  let status: LiveResponse["status"] = "pass";
  const detail: LiveResponse["detail"] = {
    backend: { status: "pass" },
    postgres: { status: "pass" },
  };

  try {
    await req.server.drizzle.execute(sql`select 1`);

    detail.postgres = { status: "pass" };
  } catch (error) {
    req.log.error(error, "PostgreSQL health check failed");

    status = "fail";
    detail.postgres = {
      status: "fail",
      output: error instanceof Error ? error.message : String(error),
    };
  }

  return res.code(status === "pass" ? 200 : 503).send({
    status,
    timestamp: new Date().toISOString(),
    detail,
  });
};
