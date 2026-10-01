import type { DatabaseConnection } from "../connection";
import { withConstraint } from "../errors";
import {
  project,
  type ProjectInsert,
  type ProjectSelect,
  users,
  type UserSelect,
} from "../schema";
import type { SingleProperty } from "../utility-types";
import { and, eq } from "drizzle-orm";


type ProjectLookup = SingleProperty<ProjectSelect, "id">;

type ProjectNameLookup = {
  username: UserSelect["username"];
  name: ProjectSelect["name"];
};

/** Создает репозиторий для управления данными реестра. */
export function createRegistryRepository(connection: DatabaseConnection) {
  /** Создает проект и возвращает сохраненную запись. */
  const createProject = withConstraint(async (data: ProjectInsert) => {
    const [createdProject] = await connection
      .insert(project)
      .values(data)
      .returning();
    return createdProject;
  });

  /** Ищет проект по полю, однозначно идентифицирующему запись. */
  const findProject = async (lookup: ProjectLookup) => {
    const [foundProject] = await connection
      .select()
      .from(project)
      .where(eq(project.id, lookup.id))
      .limit(1);
    return foundProject;
  };

  /** Ищет проект по имени пользователя и имени проекта. */
  const findProjectByUsernameAndName = async (lookup: ProjectNameLookup) => {
    const [foundProject] = await connection
      .select({ project })
      .from(project)
      .innerJoin(users, eq(project.userId, users.id))
      .where(and(
        eq(users.username, lookup.username),
        eq(project.name, lookup.name),
      ))
      .limit(1);
    return foundProject?.project;
  };

  /** Возвращает проекты, соответствующие всем переданным условиям. */
  const listProjects = async (lookup: Partial<ProjectSelect>) => {
    const conditions = (Object.entries(lookup) as [
      keyof ProjectSelect,
      ProjectSelect[keyof ProjectSelect],
    ][]).map(([field, value]) => eq(project[field], value));
    const projects = await connection
      .select()
      .from(project)
      .where(and(...conditions));
    return projects;
  };

  return {
    createProject,
    findProject,
    findProjectByUsernameAndName,
    listProjects,
  };
}
