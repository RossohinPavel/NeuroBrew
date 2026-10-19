import { Separator } from "@/common/shadcn/ui/separator";
import { TopBar } from "@/modules/top-bar";


export default function Layout(props: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar />
      <Separator />
      {props.children}
    </div>
  );
}
