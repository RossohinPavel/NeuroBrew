import { createRegistryRepository } from "@shared/database";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { ItemGroup } from "@/common/components/ui/item";
import { DB } from "@/common/db-connection";
import { getSessionUser } from "@/entities/user";
import { RepositoryItem } from "./repository-item";


const { listProjects } = createRegistryRepository(DB);


/** Представляет список репозиториев пользователя. */
export async function Repositories() {
  const user = await getSessionUser();
  const projects = await listProjects({ userId: user.id });
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle>Репозитории</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {projects.map((project) => (
            <RepositoryItem
              key={project.id}
              projectName={project.name}
              username={user.username}
            />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
