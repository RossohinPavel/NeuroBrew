"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/common/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
} from "@/common/components/ui/card";
import { 
  Field, 
  FieldDescription, 
  FieldError, 
  FieldGroup, 
  FieldLabel, 
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { loginAction } from "./action";
import { LoginFormData, LoginFormSchema } from "./schema";


/** Предоставляет форму входа в аккаунт по электронной почте и паролю. */
export function LoginForm() {

  const form = useForm<LoginFormData>({
    resolver: valibotResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const onSubmit = async (formData: LoginFormData) => {
    form.clearErrors("root.server");
    const { success, error } = await loginAction(formData);
    if (!success) {
      form.setError("root.server", { type: "server", message: error.message });
      return;
    }
    // Каких-то дополнительный действий не требуется. Севрер пришлет http-only куки. 
    // С ними может работать только браузер и он их сам установит.
    router.push("/");
    // Нужно сбросить состояние клиентской части некста. Иначе, некоторые подгруженные компоненты
    // могут не обновиться и не использовать авторизованный статус.
    router.refresh();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Введите ваши данные для входа в аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          id="form-login" 
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit)(event);
          }} 
        >
          <FieldGroup>
            <Controller 
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input 
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="email@example.com"
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller 
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <Input 
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Пароль"
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {form.formState.errors.root?.server && (
              <FieldError errors={[form.formState.errors.root.server]} />
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button 
          type="submit" 
          form="form-login" 
          size='lg'
          className="w-full"
        >
          { form.formState.isSubmitting ? "Кушаем печеньки..." : "Войти"}
        </Button>
        <FieldDescription>
          Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
