import * as schema from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import type { MyProjectsResponse } from "./registry.schema.js";
import type { RouteHandler } from "fastify";


export const getMyProjects: RouteHandler<{
  Reply: MyProjectsResponse;
}> = async (req, res) => {
  try {
    const { userId } = req.user;

    const projects = await req.server.drizzle
      .select()
      .from(schema.project)
      .where(eq(schema.project.userId, userId));

    return res.code(200).send(projects.map((project) => ({
      ...project,
      createdAt: project.createdAt.toISOString(),
    })));
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};
