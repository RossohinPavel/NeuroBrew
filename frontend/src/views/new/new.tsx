import { NewProjectForm } from "@/features/new-project";


/** Представляет страницу создания проекта. */
export function New() {
  return (
    <main className="min-h-0 flex-1">
      <div className="mx-auto flex w-full max-w-[1280px] justify-center">
        <NewProjectForm />
      </div>
    </main>
  );
}
