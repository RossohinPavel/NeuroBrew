import * as tables from "../../database/schema/index.js";
import { and, eq } from "drizzle-orm";
import type {
  MyProjectResponse,
  MyProjectsResponse,
  ProjectParams,
  ProjectResponse,
  ProjectsQuery,
  ProjectsResponse,
} from "./project.schema.js";
import type { CreateProjectRequest } from "@shared/contracts";
import type { RouteHandler } from "fastify";
import type { SQL } from "drizzle-orm";


export const getProjects: RouteHandler<{
  Querystring: ProjectsQuery;
  Reply: ProjectsResponse;
}> = async (req, res) => {
  try {
    const { username, name, userId } = req.query;

    const query = req.server.drizzle
      .select({
        id: tables.project.id,
        userId: tables.project.userId,
        name: tables.project.name,
        createdAt: tables.project.createdAt,
      })
      .from(tables.project);

    if (username !== undefined) {
      query.innerJoin(tables.users, eq(tables.project.userId, tables.users.id));
    }

    const filters: SQL[] = [];

    if (username !== undefined) {
      filters.push(eq(tables.users.username, username));
    }

    if (name !== undefined) {
      filters.push(eq(tables.project.name, name));
    }

    if (userId !== undefined) {
      filters.push(eq(tables.project.userId, userId));
    }

    const projects = await query.where(and(...filters));

    return res.code(200).send(projects.map((project) => ({
      ...project,
      createdAt: project.createdAt.toISOString(),
    })));
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};

export const getProject: RouteHandler<{
  Params: ProjectParams;
  Reply: ProjectResponse;
}> = async (req, res) => {
  try {
    const { id } = req.params;

    const [project] = await req.server.drizzle
      .select()
      .from(tables.project)
      .where(eq(tables.project.id, id))
      .limit(1);

    if (!project) {
      return res.notFound("Project not found");
    }

    return res.code(200).send({
      ...project,
      createdAt: project.createdAt.toISOString(),
    });
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};

export const createProject: RouteHandler<{
  Body: CreateProjectRequest;
  Reply: MyProjectResponse;
}> = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name } = req.body;

    const [project] = await req.server.drizzle
      .insert(tables.project)
      .values({ userId, name })
      .returning();

    if (!project) {
      throw req.server.httpErrors.internalServerError("Failed to create project");
    }

    return res.code(201).send({
      ...project,
      createdAt: project.createdAt.toISOString(),
    });
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};

export const getMyProjects: RouteHandler<{
  Reply: MyProjectsResponse;
}> = async (req, res) => {
  try {
    const { userId } = req.user;

    const projects = await req.server.drizzle
      .select()
      .from(tables.project)
      .where(eq(tables.project.userId, userId));

    return res.code(200).send(projects.map((project) => ({
      ...project,
      createdAt: project.createdAt.toISOString(),
    })));
  } catch (error) {
    req.log.error(error);

    throw error;
  }
};
