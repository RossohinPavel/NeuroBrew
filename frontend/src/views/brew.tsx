import { createAuthRepository, createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";


const { findUser } = createAuthRepository(DB);
const { listProjects } = createRegistryRepository(DB);


type Props = PageProps<"/[username]/brew">;

/** Показывает раздел Brew пользователя. */
export async function Brew({ params }: Props) {
  const { username } = await params;
  const user = await findUser({ username });
  const projects = await listProjects({ userId: user!.id });
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>{username}/brew</p>
      <p>Проекты:</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
