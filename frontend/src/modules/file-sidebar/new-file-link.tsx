import Link from "next/link";
import { Button } from "@/common/shadcn/ui/button";
import type { FileSidebarParams } from "./types";


/** Строит ссылку на создание файла в текущем проекте. */
export async function NewFileLink({ params }: { params: FileSidebarParams }) {
  const { username, project } = await params;
  const newFileHref = `/${encodeURIComponent(username)}/${encodeURIComponent(project)}/new`;

  return (
    <Button nativeButton={false} render={<Link href={newFileHref} />}>
      Создать файл
    </Button>
  );
}

/** Сохраняет место кнопки до получения параметров проекта. */
export function NewFileLinkSkeleton() {
  return <Button disabled>Создать файл</Button>;
}
