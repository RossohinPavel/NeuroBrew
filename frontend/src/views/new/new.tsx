import { Suspense } from "react";
import { NewProjectForm } from "@/features/new-project";
import { NewGuard } from "./guard";


/** Представляет страницу создания проекта. */
export function New() {
  return (
    <main className="min-h-0 flex-1">
      <div className="mx-auto flex w-full max-w-[1280px] justify-center">
        <Suspense fallback={null}>
          <NewGuard>
            <NewProjectForm />
          </NewGuard>
        </Suspense>
      </div>
    </main>
  );
}
