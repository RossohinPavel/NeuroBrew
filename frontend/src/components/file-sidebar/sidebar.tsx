import { Suspense } from "react";
import { listFiles } from "@/shared/api/generated/endpoints";
import { Input } from "@/shared/shadcn/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/shared/shadcn/ui/sidebar";
import { FileSidebarContent } from "./content";
import { NewFile } from "./new-file";
import type { FileSidebarParams } from "./types";


/** Загружает список файлов проекта для содержимого сайдбара. */
async function FileSidebarContentWrapper({ params }: { params: FileSidebarParams }) {
  const { username, project } = await params;
  const response = await listFiles({
    username,
    projectName: project,
  });

  if (response.status !== 200) {
    throw new Error("Failed to load project files.");
  }

  return <FileSidebarContent files={response.data} />;
}

/** Показывает поиск, создание файла и область списка файлов проекта. */
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
            <NewFile params={params} />
          </Suspense>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Файлы</SidebarGroupLabel>
          <SidebarMenu>
            <Suspense fallback={null}>
              <FileSidebarContentWrapper params={params} />
            </Suspense>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
