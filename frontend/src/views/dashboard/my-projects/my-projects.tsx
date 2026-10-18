import { getMyProjects as getMyProjectsRequest } from "@/common/api/generated/endpoints";
import { ItemGroup } from "@/common/shadcn/ui/item";
import { withSession } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import { MyProjectsCard } from "./my-projects-card";
import { ProjectItem } from "./project-item";


const getMyProjects = withSession(getMyProjectsRequest);


/** Представляет список проектов пользователя. */
export async function MyProjects() {
  const [response, user] = await Promise.all([
    getMyProjects(),
    getMeOrThrow(),
  ]);

  if (response.status !== 200) {
    throw new Error("Failed to load the authenticated user's projects.");
  }

  return (
    <MyProjectsCard>
      <ItemGroup>
        {response.data.map((project) => (
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
