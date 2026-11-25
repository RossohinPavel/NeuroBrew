import { TopBarBreadcrumb } from "./breadcrumb";


/** Отображает верхнюю панель приложения. */
export function TopBar() {
  return (
    <header className="min-h-[56px]">
      <div className="flex items-center justify-between px-[15px] py-[10px]">
        <TopBarBreadcrumb />
      </div>
    </header>
  );
}
