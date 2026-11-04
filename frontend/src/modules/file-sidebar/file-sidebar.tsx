import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/common/shadcn/ui/sidebar";
import { Input } from "@/common/shadcn/ui/input";
import { NewFileLink } from "./new-file-link";
import type { FileSidebarParams } from "./types";


/** Отображает область навигации по файлам проекта. */
export function FileSidebar({ params }: { params: FileSidebarParams }) {
  return (
    <Sidebar
      aria-label="Файлы проекта"
      className="m-2 h-auto shrink-0 rounded-lg shadow-sm"
      collapsible="none"
    >
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Input aria-label="Поиск файлов" placeholder="Поиск файлов..." type="search" />
          <Suspense fallback={null}>
            <NewFileLink params={params} />
          </Suspense>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
