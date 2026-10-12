import { BadRequestException, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module.js";


async function bootstrap() {
  const adapter = new FastifyAdapter({
    schemaErrorFormatter(errors, dataLocation) {
      return new BadRequestException({
        statusCode: 400,
        code: "VALIDATION_ERROR",
        error: "Bad Request",
        message: "Request validation failed",
        issues: errors.map((issue) => ({
          location: `${dataLocation}${issue.instancePath}`,
          message: issue.message,
          keyword: issue.keyword,
          params: issue.params,
        })),
      });
    },
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  // Logging
  const logger = new Logger("HTTP");
  app.getHttpAdapter().getInstance().addHook("onResponse", (req, res, done) => {
    logger.log(`${req.method} ${req.url} ${res.statusCode} in ${Math.round(res.elapsedTime)}ms`);
    done();
  });
  await app.listen(3001);
}
await bootstrap();
