import { ENV } from "../../config/index.js";


declare module "@fastify/jwt" {
  interface FastifyJWT {
    namespaces: "access" | "refresh";
    payload: { userId: number };
  }
}

export const accessTokenConfig = {
  secret: ENV.JWT_ACCESS_SECRET,
  namespace: "access",
  sign: { expiresIn: "15m" },
};

export const refreshTokenConfig = {
  secret: ENV.JWT_REFRESH_SECRET,
  namespace: "refresh",
  sign: { expiresIn: "30d" },
};
