import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";


const { searchProject } = createRegistryRepository(DB);


type Props = PageProps<"/[username]/[project]">;

/** Показывает основные сведения о проекте пользователя. */
export async function Project({ params }: Props) {
  const { project } = await params;
  const foundProject = await searchProject(project);
  return (
    <main className="flex flex-col gap-2">
      <p>ID пользователя: {foundProject!.userId}</p>
      <p>Название проекта: {foundProject!.name}</p>
    </main>
  );
}
