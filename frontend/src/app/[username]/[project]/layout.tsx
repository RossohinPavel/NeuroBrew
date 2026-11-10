import { Suspense } from "react";
import { FileSidebar } from "@/components/file-sidebar";
import {
  ProjectNavigation,
  ProjectNavigationSkeleton,
} from "@/components/project-navigation";
import { Separator } from "@/shared/shadcn/ui/separator";
import { SidebarProvider } from "@/shared/shadcn/ui/sidebar";


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
