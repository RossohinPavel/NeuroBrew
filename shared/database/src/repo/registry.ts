import { project, type ProjectInsert } from "../schema";
import { Repository } from "./abstract-repository";


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
}
