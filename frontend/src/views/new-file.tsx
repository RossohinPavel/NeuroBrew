import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMeOrThrow } from "@/entities/user";
import { NewFileForm } from "@/features/new-file";


type Props = {
  params: Promise<{
    username: string;
    project: string;
  }>;
};

/** Показывает страницу создания файла проекта. */
export function NewFile({ params }: Props) {
  return (
    <main className="min-w-0 flex-1 p-4">
      <Suspense fallback={null}>
        <NewFileContent params={params} />
      </Suspense>
    </main>
  );
}

/** Показывает форму только владельцу проекта из параметров маршрута. */
async function NewFileContent({ params }: Props) {
  const [{ username, project }, user] = await Promise.all([
    params,
    getMeOrThrow(),
  ]);

  if (user.username !== username) {
    notFound();
  }

  return <NewFileForm username={username} project={project} />;
}
