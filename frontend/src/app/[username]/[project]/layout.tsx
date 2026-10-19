import { TopBar } from "@/modules/top-bar";


export default function Layout(props: LayoutProps<"/[username]/[project]">) {
  return (
    <>
      <TopBar>
        <nav className="px-[15px]" aria-label="Навигация проекта">
          Навигация проекта
        </nav>
      </TopBar>
      {props.children}
    </>
  );
}
