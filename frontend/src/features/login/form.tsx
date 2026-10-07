import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/common/components/ui/card";
import { loginAction } from "./action";
import styles from "./form.module.css";
import { Button } from "@/common/components/ui/button";


/** Предоставляет форму входа в аккаунт по электронной почте и паролю. */
export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginAction} className={styles.form} id="form-login">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            required
          />
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button 
          type="submit" 
          form="form-login" 
          size='lg'
          className="w-full"
        >
          Войти
        </Button>
      </CardFooter>
    </Card>
  );
}
