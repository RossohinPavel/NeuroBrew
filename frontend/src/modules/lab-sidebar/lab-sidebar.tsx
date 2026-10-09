import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "@/common/shadcn/ui/sidebar";
import { CreateProjectDialog } from "@/features/create-project";


/** Отображает боковую панель лаборатории. */
export function LabSidebar() {
  return (
    <Sidebar className="md:absolute md:h-full">
      <SidebarHeader>
        <CreateProjectDialog />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Suspense fallback={null}>
              <LabSidebarContent />
            </Suspense>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function LabSidebarContent() {
  return null;
}
