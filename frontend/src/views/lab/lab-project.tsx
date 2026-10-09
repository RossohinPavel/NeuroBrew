import { Suspense } from "react";
import { getProjectByUsernameOr404 } from "@/entities/project";
import { requireCurrentUser } from "@/entities/user";


type Props = PageProps<"/lab/[project]">;

/** Представляет среду редактирования проекта пользователя. */
export function LabProject(props: Props) {
  return (
    <Suspense fallback={null}>
      <LabProjectContent {...props} />
    </Suspense>
  );
}

async function LabProjectContent({ params }: Props) {
  const { project } = await params;
  const user = await requireCurrentUser();
  const foundProject = await getProjectByUsernameOr404(user.username, project);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>ID проекта: {foundProject.id}</p>
      <p>ID пользователя: {foundProject.userId}</p>
      <p>Название проекта: {foundProject.name}</p>
    </div>
  );
}
