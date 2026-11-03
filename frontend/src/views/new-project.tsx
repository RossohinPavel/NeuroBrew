import "server-only";

import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/entities/session";
import { CreateProjectForm } from "@/features/create-project";


/** Показывает форму создания проекта пользователю с доступом к бэкенду. */
async function Content() {
  const session = await getSession();
  if (session === undefined) {
    redirect("/login");
  }
  return <CreateProjectForm />;
}

/** Представляет страницу создания проекта. */
export function NewProject() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </main>
  );
}
