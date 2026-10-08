import { SidebarProvider } from "@/common/components/ui/sidebar";
import { LabSidebar } from "@/modules/lab-sidebar";


export default function Layout({ children }: LayoutProps<"/lab">) {
  return (
    <SidebarProvider className="relative min-h-0">
      <LabSidebar />
      <div className="min-w-0 flex-1">
        {children}
      </div>
    </SidebarProvider>
  );
}
