import "server-only";

import { RiAddLine } from "@remixicon/react";
import Link from "next/link";
import { getMe } from "@/entities/user";
import { Button } from "@/shared/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/shadcn/ui/dropdown-menu";
import type { FileSidebarParams } from "./types";


/** Показывает меню добавления содержимого только владельцу проекта. */
export async function NewFile({ params }: { params: FileSidebarParams }) {
  const [user, { username, project }] = await Promise.all([
    getMe(),
    params,
  ]);
  
  if (user?.username !== username) {
    return null;
  }

  const newFileHref = `/${encodeURIComponent(username)}/${encodeURIComponent(project)}/new`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button aria-label="Добавить" size="icon" variant="outline" />}
      >
        <RiAddLine />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Добавить</DropdownMenuLabel>
          <DropdownMenuItem render={<Link href={`${newFileHref}?type=rule`} />}>
            Правило
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`${newFileHref}?type=skill`} />}>
            Скил
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
