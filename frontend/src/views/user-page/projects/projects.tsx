import Link from "next/link";
import { Button } from "@/common/shadcn/ui/button";
import { ItemGroup } from "@/common/shadcn/ui/item";
import { getProjectsOrThrow } from "@/entities/project";
import { ProjectItem } from "./project-item";


type Props = {
  username: string;
};

/** Загружает и показывает проекты пользователя по логину. */
export async function Projects({ username }: Props) {
  const projects = await getProjectsOrThrow(username);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>Проекты</div>
        <Button nativeButton={false} render={<Link href="/new" />}>
          New
        </Button>
      </div>
      <ItemGroup>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            projectName={project.name}
            username={username}
          />
        ))}
      </ItemGroup>
    </div>
  );
}
