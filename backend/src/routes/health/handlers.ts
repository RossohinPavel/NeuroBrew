import type { LiveResponse } from "@shared/contracts";
import type { RouteHandler } from "fastify";
import { sql } from "drizzle-orm";


const checkDependency = async (
  promise: PromiseLike<unknown>,
): Promise<LiveResponse["detail"]["postgres"]> => {
  try {
    await promise;
    return { status: "pass" };
  } catch (error) {
    return {
      status: "fail",
      output: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getHealthStatus: RouteHandler<{
  Reply: {
    200: LiveResponse;
    503: LiveResponse;
  };
}> = async (req, res) => {
  const detail: LiveResponse["detail"] = {
    backend: { status: "pass" },
    postgres: await checkDependency(req.server.drizzle.execute(sql`select 1`)),
    redis: await checkDependency(req.server.redis.ping()),
  };
  let status: LiveResponse["status"] = "pass";

  for (const value of Object.values(detail)) {
    if (value.status === "fail") {
      status = "fail";
    }
  }

  return res.code(status === "pass" ? 200 : 503).send({
    status,
    timestamp: new Date().toISOString(),
    detail,
  });
};
