import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { logoutAction } from "./action";


/** Предоставляет форму выхода из аккаунта. */
export function LogoutForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Выход</CardTitle>
        <CardDescription>
          Вы уверены, что хотите выйти из аккаунта?
        </CardDescription>
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
