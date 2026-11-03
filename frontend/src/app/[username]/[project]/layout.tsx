import { Separator } from "@/common/shadcn/ui/separator";
import { SidebarProvider } from "@/common/shadcn/ui/sidebar";
import { FileSidebar } from "@/modules/file-sidebar";
import { ProjectNavigation } from "@/modules/project-navigation";


export default function Layout(props: LayoutProps<"/[username]/[project]">) {
  return (
    <>
      <ProjectNavigation />
      <Separator />
      <SidebarProvider className="min-h-0 flex-1">
        <FileSidebar />
        {props.children}
      </SidebarProvider>
    </>
  );
}
