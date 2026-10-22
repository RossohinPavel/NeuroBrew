import { Suspense } from "react";
import { getProjectByNameOr404 } from "@/entities/project";


type Props = PageProps<"/[username]/[project]">;

/** Показывает основные сведения о проекте пользователя. */
export function Project(props: Props) {
  return (
    <main className="flex min-h-0 flex-1">
      <div className="mx-auto w-full max-w-[1280px]">
        <Suspense fallback={null}>
          <ProjectContent {...props} />
        </Suspense>
      </div>
    </main>
  );
}

/** Загружает проект по имени и показывает его название и дату создания. */
async function ProjectContent({ params }: Props) {
  const { project } = await params;
  const foundProject = await getProjectByNameOr404(project);
  const createdAt = new Date(foundProject.createdAt)
    .toLocaleDateString("ru-RU", { timeZone: "Europe/Moscow" });

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-xl font-semibold">{foundProject.name}</h1>
      <p className="text-sm text-muted-foreground">
        Дата создания: <time dateTime={foundProject.createdAt}>{createdAt}</time>
      </p>
    </div>
  );
}
