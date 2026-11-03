import "server-only";

import { Suspense } from "react";
import { CreateProjectForm } from "@/features/create-project";
import { SessionGuard } from "@/modules/session-guard";


/** Представляет страницу создания проекта. */
export function NewProject() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <SessionGuard>
          <CreateProjectForm />
        </SessionGuard>
      </Suspense>
    </main>
  );
}
