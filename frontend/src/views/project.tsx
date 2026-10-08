import { getProjectByUsernameOr404 } from "@/entities/project";


type Props = PageProps<"/[username]/[project]">;

/** Показывает основные сведения о проекте пользователя. */
export async function Project({ params }: Props) {
  const { project, username } = await params;
  const foundProject = await getProjectByUsernameOr404(username, project);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>ID пользователя: {foundProject.userId}</p>
      <p>Название проекта: {foundProject.name}</p>
    </div>
  );
}
