import { Separator } from "@/common/shadcn/ui/separator";
import { TopBar } from "@/modules/top-bar";


export default function Layout(props: LayoutProps<"/">) {
  return (
    <>
      <TopBar />
      <Separator />
      {props.children}
    </>
  );
}
