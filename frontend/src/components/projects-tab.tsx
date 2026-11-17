import Link from "next/link";
import { Suspense } from "react";
import { UserProjects } from "@/entities/project";
import { getMe } from "@/entities/user";
import { Button } from "@/shared/shadcn/ui/button";


type Props = {
  username: string;
};

/** Показывает вкладку проектов пользователя. */
export async function ProjectsTab({ username }: Props) {
  const user = await getMe();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>Проекты</div>
        {user?.username === username && (
          <Button nativeButton={false} render={<Link href="/new" />}>
            New
          </Button>
        )}
      </div>
      <Suspense fallback={null}>
        <UserProjects username={username} />
      </Suspense>
    </div>
  );
}
