"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/common/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/common/components/ui/navigation-menu";
import { Separator } from "@/common/components/ui/separator";


/** Отображает навигацию для авторизованного пользователя. */
export function AuthenticatedNavigation({ username }: { username: string }) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <NavigationMenu
      align="end"
      aria-label="Основная навигация"
      value={value}
      onValueChange={(nextValue, eventDetails) => {
        if (eventDetails.reason === "trigger-hover") {
          return;
        }
        setValue(nextValue as string | null);
      }}
    >
      <NavigationMenuList>
        <NavigationMenuItem value="user-menu">
          <NavigationMenuTrigger
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            {username}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-40">
            <NavigationMenuLink
              href="/lab"
              closeOnClick
              render={<Link href="/lab" />}
            >
              Lab
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/${encodeURIComponent(username)}`}
              closeOnClick
              render={<Link href={`/${encodeURIComponent(username)}`} />}
            >
              Profile
            </NavigationMenuLink>
            <Separator className="my-1" />
            <NavigationMenuLink
              href="/logout"
              closeOnClick
              render={<Link href="/logout" />}
            >
              Log Out
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
