import { TopBar } from "@/modules/top-bar";


export default function Layout(props: LayoutProps<"/">) {
  return (
    <>
      <TopBar />
      {props.children}
    </>
  );
}
