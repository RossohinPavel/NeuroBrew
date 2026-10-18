import { TopBar } from "@/modules/top-bar";


export default function Layout({ children }: LayoutProps<"/[username]">) {
  return (
    <>
      <TopBar>
        <nav className="px-[15px]" aria-label="Навигация профиля">
          Навигация профиля
        </nav>
      </TopBar>
      {children}
    </>
  );
}
