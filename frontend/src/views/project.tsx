import { Suspense } from "react";


type Props = PageProps<"/[username]/[project]">;

/** Показывает основные сведения о проекте пользователя. */
export function Project(props: Props) {
  return (
    <main className="flex min-h-0 flex-1">
      <Suspense fallback={null}>
        <ProjectContent {...props} />
      </Suspense>
    </main>
  );
}

async function ProjectContent({ params }: Props) {
  const { project, username } = await params;
  return `${username}: ${project}`;
  // const foundProject = await getProjectByUsernameOr404(username, project);
  // return (
  //   <div className="flex flex-1 flex-col gap-2">
  //     <p>ID пользователя: {foundProject.userId}</p>
  //     <p>Название проекта: {foundProject.name}</p>
  //   </div>
  // );
}
