import type { RouteHandler } from "fastify";


export const register: RouteHandler = async (_req, res) => {
  return res.code(501).send();
};

export const login: RouteHandler = async (_req, res) => {
  return res.code(501).send();
};

export const refresh: RouteHandler = async (_req, res) => {
  return res.code(501).send();
};

export const logout: RouteHandler = async (_req, res) => {
  return res.code(501).send();
};
