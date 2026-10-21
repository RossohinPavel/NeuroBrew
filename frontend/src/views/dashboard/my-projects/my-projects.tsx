import { ItemGroup } from "@/common/shadcn/ui/item";
import { getMyProjectsOrThrow } from "@/entities/project";
import { getMeOrThrow } from "@/entities/user";
import { MyProjectsCard } from "./my-projects-card";
import { ProjectItem } from "./project-item";


/** Представляет список проектов пользователя. */
export async function MyProjects() {
  const [projects, user] = await Promise.all([
    getMyProjectsOrThrow(),
    getMeOrThrow(),
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
