import { Suspense } from "react";
import { TopBarBreadcrumb } from "./breadcrumb";
import { Navigation } from "./navigation";


/** Отображает верхнюю панель приложения. */
export function TopBar() {
  return (
    <header className="min-h-[56px]">
      <div className="flex items-center justify-between px-[15px] py-[10px]">
        <TopBarBreadcrumb />
        <Suspense fallback={null}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}
