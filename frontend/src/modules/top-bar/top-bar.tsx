import "server-only";

import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import NeuroBrewLogo from "@/common/assets/NeuroBrew.svg";
import { Separator } from "@/common/shadcn/ui/separator";
import { Navigation } from "./navigation";


/** Отображает верхнюю панель приложения. */
export function TopBar({ children }: { children?: ReactNode }) {
  return (
    <header className="min-h-[56px]">
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
          <Suspense fallback={<div className="h-9" aria-hidden="true" />}>
            <Navigation />
          </Suspense>
        </div>
      </div>
      {children}
      <Separator />
    </header>
  );
}
