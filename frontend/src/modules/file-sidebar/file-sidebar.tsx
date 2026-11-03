import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/common/shadcn/ui/sidebar";


/** Отображает область навигации по файлам проекта. */
export function FileSidebar() {
  return (
    <Sidebar
      aria-label="Файлы проекта"
      className="m-2 h-auto shrink-0 rounded-lg shadow-sm"
      collapsible="none"
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
