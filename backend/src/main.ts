import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module.js";


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
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
