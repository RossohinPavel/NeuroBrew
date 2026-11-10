import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMeOrThrow } from "@/entities/user";
import { FileCreateForm } from "@/features/file-create";


type Props = PageProps<"/[username]/[project]/new">;

/** Показывает страницу создания файла проекта. */
export default function CreateFile(props: Props) {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col p-4">
      <Suspense fallback={null}>
        <FileCreateContent {...props} />
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
