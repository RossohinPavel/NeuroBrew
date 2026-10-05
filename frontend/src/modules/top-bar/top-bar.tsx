import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Router } from "./router";


/** Отображает верхнюю панель приложения. */
export function TopBar() {
  return (
    <header className="bg-surface-3">
      <div className="flex items-center justify-between px-[10px] py-[5px]">
        <div>
          <Link href="/" className="relative block h-7 w-48 overflow-hidden">
            <Image
              src="/neurobrew_refined_black_mug.png"
              alt="NeuroBrew"
              fill
              sizes="182px"
              className="object-cover object-[center_85%]"
              loading="eager"
            />
          </Link>
        </div>
        <div className="flex justify-end">
          <Suspense fallback={null} >
            <Router />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
