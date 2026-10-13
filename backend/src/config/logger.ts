export const LOGGER_CONFIG = {
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
