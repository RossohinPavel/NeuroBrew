import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { getSessionUser } from "@/entities/user";


const { listProjects } = createRegistryRepository(DB);


/** Представляет список репозиториев пользователя. */
export async function Repositories() {
  const user = await getSessionUser();
  const projects = await listProjects({ userId: user.id });
  return (
    <ul className="p-4">
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
