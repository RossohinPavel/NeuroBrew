import { getProjectByUsernameOr404 } from "@/entities/project";
import { requireSessionUser } from "@/entities/user";
import { Suspense } from "react";


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
  const user = await requireSessionUser();
  const foundProject = await getProjectByUsernameOr404(user.username, project);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>ID проекта: {foundProject.id}</p>
      <p>ID пользователя: {foundProject.userId}</p>
      <p>Название проекта: {foundProject.name}</p>
    </div>
  );
}
