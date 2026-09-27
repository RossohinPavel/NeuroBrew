import { DB } from "@/common/db";


type Props = PageProps<"/[username]/brew/[project]">;

/** Представляет среду редактирования проекта пользователя. */
export async function BrewProject({ params }: Props) {
  const { project } = await params;
  const foundProject = await DB.registry.searchProject(project);
  return (
    <main className="flex flex-col gap-2">
      <p>ID проекта: {foundProject!.id}</p>
      <p>ID пользователя: {foundProject!.userId}</p>
      <p>Название проекта: {foundProject!.name}</p>
    </main>
  );
}
