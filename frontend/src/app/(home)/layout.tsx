import { TopBar } from "@/modules/top-bar";


export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
