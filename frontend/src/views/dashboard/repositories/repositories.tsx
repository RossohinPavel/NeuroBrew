import { createRegistryRepository } from "@shared/database";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { DB } from "@/common/db-connection";
import { getSessionUser } from "@/entities/user";


const { listProjects } = createRegistryRepository(DB);


/** Представляет список репозиториев пользователя. */
export async function Repositories() {
  const user = await getSessionUser();
  const projects = await listProjects({ userId: user.id });
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Репозитории</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
