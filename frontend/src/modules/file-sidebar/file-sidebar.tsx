import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/common/shadcn/ui/sidebar";
import { NewFileLink, NewFileLinkSkeleton } from "./new-file-link";
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
        <Suspense fallback={<NewFileLinkSkeleton />}>
          <NewFileLink params={params} />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
