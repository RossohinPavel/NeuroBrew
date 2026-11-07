import "server-only";

import { RiAddLine } from "@remixicon/react";
import Link from "next/link";
import { Button } from "@/shared/shadcn/ui/button";
import { getMe } from "@/entities/user";
import type { FileSidebarParams } from "./types";


/** Показывает создание файла только владельцу проекта. */
export async function NewFileLink({ params }: { params: FileSidebarParams }) {
  const [user, { username, project }] = await Promise.all([
    getMe(),
    params,
  ]);
  
  if (user?.username !== username) {
    return null;
  }

  const newFileHref = `/${encodeURIComponent(username)}/${encodeURIComponent(project)}/new`;

  return (
    <Button
      aria-label="Создать файл"
      nativeButton={false}
      render={<Link href={newFileHref} />}
      size="icon"
      variant="outline"
    >
      <RiAddLine />
    </Button>
  );
}
