import { app, registerAppRoutes } from "./app.js";


registerAppRoutes(app);

try {
  await app.listen({ port: 8080, host: "0.0.0.0",});
} catch (error) {
  app.log.error(error);

  process.exit(1);
}
