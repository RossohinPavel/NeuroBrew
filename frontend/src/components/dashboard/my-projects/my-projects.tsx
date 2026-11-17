import { getCurrentUserOrThrow } from "@/entities/current-user";
import { getMyProjectsOrThrow } from "@/entities/project";
import { ItemGroup } from "@/shared/shadcn/ui/item";
import { MyProjectsCard } from "./my-projects-card";
import { ProjectItem } from "./project-item";


/** Представляет список проектов пользователя. */
export async function MyProjects() {
  const [projects, user] = await Promise.all([
    getMyProjectsOrThrow(),
    getCurrentUserOrThrow(),
  ]);

  return (
    <MyProjectsCard>
      <ItemGroup>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            projectName={project.name}
            username={user.username}
          />
        ))}
      </ItemGroup>
    </MyProjectsCard>
  );
}
