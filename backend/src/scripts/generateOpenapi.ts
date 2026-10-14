import { mkdir, writeFile } from "node:fs/promises";
import fastify from "fastify";
import { registerAppRoutes } from "../app.js";
import swagger from "@fastify/swagger";


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
