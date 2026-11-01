import Link from "next/link";
import { Button } from "@/common/shadcn/ui/button";
import { ItemGroup } from "@/common/shadcn/ui/item";
import { getProjectsOr404 } from "@/entities/project";
import { getSession } from "@/entities/session";
import { ProjectItem } from "./project-item";


type Props = {
  username: string;
};

/** Загружает и показывает проекты пользователя по логину. */
export async function Projects({ username }: Props) {
  const [projects, session] = await Promise.all([
    getProjectsOr404(username),
    getSession(),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>Проекты</div>
        {session !== undefined && (
          <Button nativeButton={false} render={<Link href="/new" />}>
            New
          </Button>
        )}
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
