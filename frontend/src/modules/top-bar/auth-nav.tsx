"use client";

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
          <NavigationMenuContent>
            <NavigationMenuLink href="/logout" closeOnClick>
              Log Out
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
