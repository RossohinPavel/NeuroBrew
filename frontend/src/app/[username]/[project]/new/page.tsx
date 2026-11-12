import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMeOrThrow } from "@/entities/user";
import { FileCreateForm } from "@/features/file-create";


type Props = PageProps<"/[username]/[project]/new">;

/** Показывает страницу создания файла проекта. */
export default function CreateFile(props: Props) {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col p-2">
      <Suspense fallback={null}>
        <FileCreateContent {...props} />
      </Suspense>
    </main>
  );
}

/** Показывает форму только владельцу проекта из параметров маршрута. */
async function FileCreateContent({ params, searchParams }: Props) {
  const [{ username, project }, { type }, user] = await Promise.all([
    params,
    searchParams,
    getMeOrThrow(),
  ]);

  if (user.username !== username) {
    notFound();
  }

  const fileType = Array.isArray(type) ? type[0] : type;

  return <FileCreateForm username={username} project={project} type={fileType} />;
}
