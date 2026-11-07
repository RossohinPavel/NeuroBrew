import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMeOrThrow } from "@/entities/user";
import { FileCreateForm } from "@/features/file-create";


type Props = {
  params: Promise<{
    username: string;
    project: string;
  }>;
};

/** Показывает страницу создания файла проекта. */
export function FileCreate({ params }: Props) {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col p-4">
      <Suspense fallback={null}>
        <FileCreateContent params={params} />
      </Suspense>
    </main>
  );
}

/** Показывает форму только владельцу проекта из параметров маршрута. */
async function FileCreateContent({ params }: Props) {
  const [{ username, project }, user] = await Promise.all([
    params,
    getMeOrThrow(),
  ]);

  if (user.username !== username) {
    notFound();
  }

  return <FileCreateForm username={username} project={project} />;
}
