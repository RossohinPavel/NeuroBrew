import { Separator } from "@/common/shadcn/ui/separator";


export default function Layout(props: LayoutProps<"/[username]/[project]">) {
  return (
    <>
      <nav className="px-[15px]" aria-label="Навигация проекта">
        Навигация проекта
      </nav>
      <Separator />
      {props.children}
    </>
  );
}
