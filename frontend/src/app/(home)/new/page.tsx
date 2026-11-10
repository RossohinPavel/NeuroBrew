import "server-only";

import { Suspense } from "react";
import { SessionGuard } from "@/components/session-guard";
import { ProjectCreateForm } from "@/features/project-create";


/** Представляет страницу создания проекта. */
export default function CreateProject() {
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
