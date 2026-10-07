import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/common/components/ui/card";
import { loginAction } from "./action";
import styles from "./form.module.css";
import { Button } from "@/common/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";


/** Предоставляет форму входа в аккаунт по электронной почте и паролю. */
export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Введите ваши данные для входа в аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginAction} className={styles.form} id="form-login">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input 
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                required
              />
            </Field>
          </FieldGroup>
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
