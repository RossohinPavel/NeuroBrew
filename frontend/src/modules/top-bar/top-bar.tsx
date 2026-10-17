import "server-only";

import Link from "next/link";
import { Suspense } from "react";
import NeuroBrewLogo from "@/common/assets/NeuroBrew.svg";
import { Separator } from "@/common/shadcn/ui/separator";
import * as Session from "@/entities/session";
import { AuthenticatedNavigation } from "./auth-nav";
import { UnauthenticatedNavigation } from "./unauth-nav";


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
          <Suspense fallback={null} >
            <Router />
          </Suspense>
        </div>
      </div>
      <Separator />
    </header>
  );
}

/** Отображает навигацию в соответствии с состоянием сессии. */
async function Router() {
  const isAuthenticated = await Session.isUserAuthenticated();

  if (isAuthenticated) {
    return <AuthenticatedNavigation username={"TEST PLUG"} />;
  }

  return <UnauthenticatedNavigation />;
}
