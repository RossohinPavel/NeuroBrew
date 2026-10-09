import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { ItemGroup } from "@/common/shadcn/ui/item";
import { requireCurrentUser } from "@/entities/user";
import { RepositoriesCard } from "./repositories-card";
import { RepositoryItem } from "./repository-item";


const { listProjects } = createRegistryRepository(DB);


/** Представляет список репозиториев пользователя. */
export async function Repositories() {
  const user = await requireCurrentUser();
  const projects = await listProjects({ userId: user.id });
  return (
    <RepositoriesCard>
      <ItemGroup>
        {projects.map((project) => (
          <RepositoryItem
            key={project.id}
            projectName={project.name}
            username={user.username}
          />
        ))}
      </ItemGroup>
    </RepositoriesCard>
  );
}
