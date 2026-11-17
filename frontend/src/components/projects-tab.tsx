import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/entities/current-user";
import { UserProjects } from "@/entities/project";
import { Button } from "@/shared/shadcn/ui/button";
import { Separator } from "@/shared/shadcn/ui/separator";


/** Показывает вкладку проектов пользователя. */
export async function ProjectsTab({ username }: { username: string }) {
  const user = await getCurrentUser();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-3">
        <div>Проекты</div>
        {user?.username === username && (
          <Button nativeButton={false} render={<Link href="/new" />}>
            New
          </Button>
        )}
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <Suspense fallback={null}>
        <UserProjects className="pt-1.5" username={username} />
      </Suspense>
    </div>
  );
}
