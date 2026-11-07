import "server-only";

import { Suspense } from "react";
import { TopBarBreadcrumb } from "./breadcrumb";
import { Navigation } from "./navigation";


/** Отображает верхнюю панель приложения. */
export function TopBar() {
  return (
    <header className="min-h-[56px]">
      <div className="flex items-center justify-between px-[15px] py-[10px]">
        <TopBarBreadcrumb />
        <div className="flex justify-end">
          <Suspense fallback={<div className="h-9" aria-hidden="true" />}>
            <Navigation />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
