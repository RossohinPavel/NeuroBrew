import fastify from "fastify";
import sensible from "@fastify/sensible";
import { apiRoutes } from "../src/routes/api.routes.js";


const app = fastify();

try {
  await app.register(sensible, { sharedSchemaId: "HttpError" });

  await app.register(apiRoutes);
  await app.ready();

  // oxlint-disable-next-line no-console -- Prints the route tree requested by this CLI script.
  console.log(app.printRoutes());
} finally {
  await app.close();
}
