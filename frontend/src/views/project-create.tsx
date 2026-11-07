import "server-only";

import { Suspense } from "react";
import { ProjectCreateForm } from "@/features/project-create";
import { SessionGuard } from "@/modules/session-guard";


/** Представляет страницу создания проекта. */
export function ProjectCreate() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <SessionGuard>
          <ProjectCreateForm />
        </SessionGuard>
      </Suspense>
    </main>
  );
}
