import { getProjectByUsernameOr404 } from "@/entities/project";
import { SessionGuard } from "@/entities/session";


type Props = PageProps<"/[username]/brew/[project]">;

/** Представляет среду редактирования проекта пользователя. */
export function BrewProject(props: Props) {
  return (
    <SessionGuard fallback={null}>
      <BrewProjectContent {...props} />
    </SessionGuard>
  );
}

async function BrewProjectContent({ params }: Props) {
  const { project, username } = await params;
  const foundProject = await getProjectByUsernameOr404(username, project);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>ID проекта: {foundProject.id}</p>
      <p>ID пользователя: {foundProject.userId}</p>
      <p>Название проекта: {foundProject.name}</p>
    </div>
  );
}
