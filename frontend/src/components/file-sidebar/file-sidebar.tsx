import { Suspense } from "react";
import { Input } from "@/shared/shadcn/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/shared/shadcn/ui/sidebar";
import { FileSidebarContent } from "./file-sidebar-content";
import { NewFileLink } from "./new-file-link";
import type { FileSidebarParams } from "./types";


/** Показывает поиск и создание файла над пустой областью списка. */
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
        <FileSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
}
