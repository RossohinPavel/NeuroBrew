import { Separator } from "@/common/shadcn/ui/separator";


export default function Layout(props: LayoutProps<"/">) {
  return (
    <>
      <Separator />
      {props.children}
    </>
  );
}
