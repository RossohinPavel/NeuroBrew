import { withConstraint } from "../errors";
import { project, type ProjectInsert } from "../schema";
import type { DatabaseConnection } from "./types";
import { eq } from "drizzle-orm";


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

  /** Ищет проект по имени. */
  const searchProject = async (name: string) => {
    const [foundProject] = await connection
      .select()
      .from(project)
      .where(eq(project.name, name))
      .limit(1);
    return foundProject;
  };

  /** Возвращает все проекты пользователя. */
  const getUserProjects = async (userId: number) => {
    const projects = await connection
      .select()
      .from(project)
      .where(eq(project.userId, userId));
    return projects;
  };

  return {
    createProject,
    searchProject,
    getUserProjects,
  };
}
