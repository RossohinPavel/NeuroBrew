import { buildApp } from "./app.js";


const app = buildApp();

try {
  await app.listen({
    port: 8080,
    host: "0.0.0.0",
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
