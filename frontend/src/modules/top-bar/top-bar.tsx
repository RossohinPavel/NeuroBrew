import "server-only";

import Link from "next/link";
import { Suspense } from "react";
import NeuroBrewLogo from "@/common/assets/NeuroBrew.svg";
import { Separator } from "@/common/shadcn/ui/separator";
import { Navigation } from "./navigation";


/** Отображает верхнюю панель приложения. */
export function TopBar() {
  return (
    <header className="min-h-[45px] bg-surface-3">
      <div className="flex items-center justify-between px-[15px] py-[10px]">
        <div>
          <Link href="/" className="block">
            <NeuroBrewLogo
              width={188}
              height={28}
              aria-label="NeuroBrew"
            />
          </Link>
        </div>
        <div className="flex justify-end">
          <Suspense fallback={null}>
            <Navigation />
          </Suspense>
        </div>
      </div>
      <Separator />
    </header>
  );
}
