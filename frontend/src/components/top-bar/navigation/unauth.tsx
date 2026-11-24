"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/shared/shadcn/ui/button";


/** Отображает навигацию для неавторизованного пользователя. */
export function UnauthenticatedNavigation() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1" aria-label="Основная навигация">
      <Link
        href="/app/login"
        className={buttonVariants({ variant: "secondary", size: "lg" })}
        aria-current={pathname === "/app/login" ? "page" : undefined}
      >
        Sign In
      </Link>
      <Link
        href="/app/register"
        className={buttonVariants({ variant: "default", size: "lg" })}
        aria-current={pathname === "/app/register" ? "page" : undefined}
      >
        Sign Up
      </Link>
    </nav>
  );
}
