import { createAuthRepository, createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";


const { searchUser } = createAuthRepository(DB);
const { getUserProjects } = createRegistryRepository(DB);


type Props = PageProps<"/[username]/brew">;

/** Показывает раздел Brew пользователя. */
export async function Brew({ params }: Props) {
  const { username } = await params;
  const user = await searchUser({ username });
  const projects = await getUserProjects(user!.id);
  return (
    <main className="flex flex-col gap-2">
      <p>{username}/brew</p>
      <p>Проекты:</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </main>
  );
}
