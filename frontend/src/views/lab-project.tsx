import { getProjectByUsernameOr404 } from "@/entities/project";
import { SessionGuard } from "@/entities/session";
import { getSessionUser } from "@/entities/user";


type Props = PageProps<"/lab/[project]">;

/** Представляет среду редактирования проекта пользователя. */
export function LabProject(props: Props) {
  return (
    <SessionGuard fallback={null}>
      <LabProjectContent {...props} />
    </SessionGuard>
  );
}

async function LabProjectContent({ params }: Props) {
  const { project } = await params;
  const user = await getSessionUser();
  const foundProject = await getProjectByUsernameOr404(user.username, project);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>ID проекта: {foundProject.id}</p>
      <p>ID пользователя: {foundProject.userId}</p>
      <p>Название проекта: {foundProject.name}</p>
    </div>
  );
}
