import { join, resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import fastify from "fastify";
import { loadEnvFile } from "node:process";
import sensible from "@fastify/sensible";
import swagger from "@fastify/swagger";


loadEnvFile(".env");

const { registerAppRoutes } = await import("../app.js");
const app = fastify();

try {
  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "NeuroBrew API",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });
  await app.register(sensible, { sharedSchemaId: "HttpError" });

  registerAppRoutes(app);
  await app.ready();

  const tempDirectory = resolve(import.meta.dirname, "../../.temp");
  await mkdir(tempDirectory, { recursive: true });
  await writeFile(
    join(tempDirectory, "openapi.json"),
    JSON.stringify(app.swagger(), null, 2),
  );
} finally {
  await app.close();
}
