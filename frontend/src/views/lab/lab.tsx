import { createRegistryRepository } from "@shared/database";
import { Suspense } from "react";
import { DB } from "@/common/db-connection";
import { requireSessionUser } from "@/entities/user";


const { listProjects } = createRegistryRepository(DB);


/** Показывает лабораторию текущего пользователя. */
export function Lab() {
  return (
    <Suspense fallback={null}>
      <LabContent />
    </Suspense>
  );
}

async function LabContent() {
  const user = await requireSessionUser();
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
