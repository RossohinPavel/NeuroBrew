import fastify from "fastify";
import sensible from "@fastify/sensible";


const { registerAppRoutes } = await import("../app.js");
const app = fastify();

try {
  await app.register(sensible, { sharedSchemaId: "HttpError" });

  registerAppRoutes(app);
  await app.ready();

  // oxlint-disable-next-line no-console -- Prints the route tree requested by this CLI script.
  console.log(app.printRoutes());
} finally {
  await app.close();
}
