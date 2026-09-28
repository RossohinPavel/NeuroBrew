import { DB } from "@/common/db";


type Props = PageProps<"/[username]/brew">;

/** Показывает раздел Brew пользователя. */
export async function Brew({ params }: Props) {
  const { username } = await params;
  const user = await DB.auth.searchUser({ username });
  const projects = await DB.registry.getUserProjects(user!.id);
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
