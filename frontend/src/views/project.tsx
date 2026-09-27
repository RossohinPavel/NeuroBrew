import { DB } from "@/common/db";


type Props = PageProps<"/[username]/[project]">;

/** Показывает основные сведения о проекте пользователя. */
export async function Project({ params }: Props) {
  const { project } = await params;
  const foundProject = await DB.registry.searchProject(project);
  return (
    <main className="flex flex-col gap-2">
      <p>ID пользователя: {foundProject!.userId}</p>
      <p>Название проекта: {foundProject!.name}</p>
    </main>
  );
}
