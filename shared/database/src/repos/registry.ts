import type { DatabaseConnection } from "../connection";
import { withConstraint } from "../errors";
import { project, type ProjectInsert, type ProjectSelect } from "../schema";
import type { SingleProperty } from "../utility-types";
import { eq } from "drizzle-orm";


type ProjectLookup =
  | SingleProperty<ProjectSelect, "id">
  | SingleProperty<ProjectSelect, "name">;

type ProjectListLookup = SingleProperty<ProjectSelect, "userId">;

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

  /** Ищет проект по идентификатору или названию. */
  const findProject = async (lookup: ProjectLookup) => {
    const [field, value] = Object.entries(lookup)[0] as [
      keyof ProjectSelect,
      ProjectSelect[keyof ProjectSelect],
    ];
    const [foundProject] = await connection
      .select()
      .from(project)
      .where(eq(project[field], value))
      .limit(1);
    return foundProject;
  };

  /** Возвращает все проекты пользователя. */
  const listProjects = async (lookup: ProjectListLookup) => {
    const [field, value] = Object.entries(lookup)[0] as [
      keyof ProjectSelect,
      ProjectSelect[keyof ProjectSelect],
    ];
    const projects = await connection
      .select()
      .from(project)
      .where(eq(project[field], value));
    return projects;
  };

  return {
    createProject,
    findProject,
    listProjects,
  };
}
