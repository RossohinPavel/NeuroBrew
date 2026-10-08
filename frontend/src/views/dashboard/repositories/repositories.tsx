import { createRegistryRepository } from "@shared/database";
import { ItemGroup } from "@/common/components/ui/item";
import { DB } from "@/common/db-connection";
import { requireSessionUser } from "@/entities/user";
import { RepositoriesCard } from "./repositories-card";
import { RepositoryItem } from "./repository-item";


const { listProjects } = createRegistryRepository(DB);


/** Представляет список репозиториев пользователя. */
export async function Repositories() {
  const user = await requireSessionUser();
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
