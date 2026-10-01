"use client";

import { usePathname } from "next/navigation";
import { LinkButton } from "./link-button";


/** Отображает навигацию для неавторизованного пользователя. */
export function UnauthenticatedNavigation() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1" aria-label="Основная навигация">
      <LinkButton
        href="/login"
        title="Sign In"
        isCurrent={pathname === "/login"}
      />
      <LinkButton
        href="/register"
        title="Sign Up"
        isCurrent={pathname === "/register"}
      />
    </nav>
  );
}
