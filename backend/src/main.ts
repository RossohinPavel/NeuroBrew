import { ENV } from "./config/index.js";
import fastify from "fastify";


const prettyLoggerConfig = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:HH:MM:ss",
      ignore: "reqId,pid,hostname,req.remoteAddress,req.remotePort",
      singleLine: true,
    },
  },
};

const server = fastify({
  logger: ENV.NODE_ENV === "development" ? prettyLoggerConfig : true,
});

server.get("/", async (_request, _reply) => {
  return { hello: "world" };
});

server.listen({ port: 8080, host: "0.0.0.0" }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
