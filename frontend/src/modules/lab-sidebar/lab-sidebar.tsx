import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/common/components/ui/sidebar";
import { CreateProjectDialog } from "@/features/create-project";
import { Suspense } from "react";

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

async function LabSidebarContent() {
  return null;
}
