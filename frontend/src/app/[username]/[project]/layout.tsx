import { Suspense } from "react";
import { Separator } from "@/common/shadcn/ui/separator";
import { SidebarProvider } from "@/common/shadcn/ui/sidebar";
import { FileSidebar } from "@/modules/file-sidebar";
import {
  ProjectNavigation,
  ProjectNavigationSkeleton,
} from "@/modules/project-navigation";


export default function Layout(props: LayoutProps<"/[username]/[project]">) {
  return (
    <>
      <Suspense fallback={<ProjectNavigationSkeleton />}>
        <ProjectNavigation />
      </Suspense>
      <Separator />
      <SidebarProvider className="min-h-0 flex-1">
        <FileSidebar params={props.params} />
        {props.children}
      </SidebarProvider>
    </>
  );
}
