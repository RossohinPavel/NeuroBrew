import { project, type ProjectInsert } from "../schema";
import { Repository } from "./abstract-repository";
import { eq } from "drizzle-orm";


/** Управляет данными реестра. */
export class RegistryRepository extends Repository {

  /** Создает проект и возвращает сохраненную запись. */
  async createProject(data: ProjectInsert) {
    const [createdProject] = await this.connection
      .insert(project)
      .values(data)
      .returning();
    return createdProject;
  }

  /** Ищет проект по имени. */
  async searchProject(name: string) {
    const [foundProject] = await this.connection
      .select()
      .from(project)
      .where(eq(project.name, name))
      .limit(1);
    return foundProject;
  }

  /** Возвращает все проекты пользователя. */
  async getUserProjects(userId: number) {
    const projects = await this.connection
      .select()
      .from(project)
      .where(eq(project.userId, userId));
    return projects;
  }
}
