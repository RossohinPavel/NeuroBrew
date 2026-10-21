import { Separator } from "@/common/shadcn/ui/separator";
import { ProjectNavigation } from "@/modules/project-navigation";


export default function Layout(props: LayoutProps<"/[username]/[project]">) {
  return (
    <>
      <ProjectNavigation />
      <Separator />
      {props.children}
    </>
  );
}
