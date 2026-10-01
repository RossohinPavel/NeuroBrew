import { getProjectByUsernameOr404 } from "@/entities/project";


type Props = PageProps<"/[username]/brew/[project]">;

/** Представляет среду редактирования проекта пользователя. */
export async function BrewProject({ params }: Props) {
  const { project, username } = await params;
  const foundProject = await getProjectByUsernameOr404(username, project);
  return (
    <main className="flex flex-col gap-2">
      <p>ID проекта: {foundProject.id}</p>
      <p>ID пользователя: {foundProject.userId}</p>
      <p>Название проекта: {foundProject.name}</p>
    </main>
  );
}
