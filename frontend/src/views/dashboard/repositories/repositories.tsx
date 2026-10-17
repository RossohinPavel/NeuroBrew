import { ItemGroup } from "@/common/shadcn/ui/item";
import { RepositoriesCard } from "./repositories-card";
import { RepositoryItem } from "./repository-item";


/** Представляет список репозиториев пользователя. */
export async function Repositories() {
  return null;
  // const user = await requireCurrentUser();
  // const projects = await listProjects({ userId: user.id });
  // return (
  //   <RepositoriesCard>
  //     <ItemGroup>
  //       {projects.map((project) => (
  //         <RepositoryItem
  //           key={project.id}
  //           projectName={project.name}
  //           username={user.username}
  //         />
  //       ))}
  //     </ItemGroup>
  //   </RepositoriesCard>
  // );
}
