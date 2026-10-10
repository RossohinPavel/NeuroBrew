import { writeFile } from "node:fs/promises";
import swagger from "@fastify/swagger";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module.js";

async function generateOpenApi() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false }
  );
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
    await app.init();
    const fastify = app.getHttpAdapter().getInstance();
    await fastify.ready();
    const document = fastify.swagger();
    const outputUrl = new URL("../openapi.json", import.meta.url);
    const contents = JSON.stringify(document, null, 2);
    await writeFile(outputUrl, contents);
  } finally {
    await app.close();
  }
}

await generateOpenApi();
