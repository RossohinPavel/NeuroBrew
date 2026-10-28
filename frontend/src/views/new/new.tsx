import { Suspense } from "react";
import { CreateProjectForm } from "@/features/create-project";
import { NewGuard } from "./guard";


/** Представляет страницу создания проекта. */
export function New() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <NewGuard>
          <CreateProjectForm />
        </NewGuard>
      </Suspense>
    </main>
  );
}
