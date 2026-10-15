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
    },
  });
  await app.register(sensible, { sharedSchemaId: "HttpError" });
  registerAppRoutes(app);
  await app.ready();

  const tempDirectory = new URL("../../.temp/", import.meta.url);
  await mkdir(tempDirectory, { recursive: true });
  await writeFile(
    new URL("openapi.json", tempDirectory),
    JSON.stringify(app.swagger(), null, 2),
  );
} finally {
  await app.close();
}
