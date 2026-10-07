"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/common/components/ui/card";
import { loginAction } from "./action";
import { Button } from "@/common/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { LoginFormData, LoginFormSchema } from "./schema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";


/** Предоставляет форму входа в аккаунт по электронной почте и паролю. */
export function LoginForm() {

  const form = useForm<LoginFormData>({
    resolver: valibotResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const onSubmit = async (formData: LoginFormData) => {
    const {success, error} = await loginAction(formData);
    if ( !success ) {
      form.setError("root.server", {
        type: "server",
        message: error.message
      })
      return;
    }
    router.push("/");
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
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)} >
          <FieldGroup>
            <Controller 
              name="email"
              control={form.control}
              render={({field, fieldState}) => (
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
              render={({field, fieldState}) => (
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
