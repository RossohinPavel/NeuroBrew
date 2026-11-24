import { Separator } from "@/shared/shadcn/ui/separator";


export default function Layout(props: LayoutProps<"/">) {
  return (
    <>
      <Separator />
      {props.children}
    </>
  );
}
