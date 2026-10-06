import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { getOr404 } from "@/entities/session";


const { listProjects } = createRegistryRepository(DB);


/** Представляет список репозиториев пользователя. */
export async function Repositories() {
  const session = await getOr404();
  const projects = await listProjects({ userId: session.userId });
  return (
    <ul className="p-4">
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
