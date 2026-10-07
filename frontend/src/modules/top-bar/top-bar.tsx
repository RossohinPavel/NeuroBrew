import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NeuroBrewLogo from "@/common/assets/NeuroBrew.svg";
import { Separator } from "@/common/components/ui/separator";
import { Router } from "./router";


/** Отображает верхнюю панель приложения. */
export function TopBar() {
  return (
    <header className="min-h-[45px] bg-surface-3">
      <div className="flex items-center justify-between px-[15px] py-[10px]">
        <div>
          <Link href="/" className="block">
            <Image
              src={NeuroBrewLogo}
              alt="NeuroBrew"
              className="h-7 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex justify-end">
          <Suspense fallback={null} >
            <Router />
          </Suspense>
        </div>
      </div>
      <Separator />
    </header>
  );
}
