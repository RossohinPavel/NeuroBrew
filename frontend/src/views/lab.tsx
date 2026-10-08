import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { SessionGuard } from "@/entities/session";
import { getSessionUser } from "@/entities/user";


const { listProjects } = createRegistryRepository(DB);


/** Показывает лабораторию текущего пользователя. */
export function Lab() {
  return (
    <SessionGuard fallback={null}>
      <LabContent />
    </SessionGuard>
  );
}

async function LabContent() {
  const user = await getSessionUser();
  const projects = await listProjects({ userId: user.id });
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>{user.username}/lab</p>
      <p>Проекты:</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
