"use client";

import { RiArrowLeftLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { logoutAction } from "./action";


/** Предоставляет форму выхода из аккаунта. */
export function LogoutForm() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Выход</CardTitle>
        <CardDescription>
          Вы уверены, что хотите выйти из аккаунта?
        </CardDescription>
        <CardAction>
          <Button onClick={() => router.back()} type="button" variant="outline">
            <RiArrowLeftLine aria-hidden="true" data-icon="inline-start" />
            Назад
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="justify-end">
        <form action={logoutAction} className="w-full">
          <Button 
            className="w-full" 
            size="lg" 
            type="submit" 
            variant="destructive"
          >
            Выйти
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
