"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { registerAction } from "./action";
import { RegisterFormSchema, type RegisterFormData } from "./schema";


/** Предоставляет форму создания нового аккаунта. */
export function RegisterForm() {

  const form = useForm<RegisterFormData>({
    resolver: valibotResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      username: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (formData: RegisterFormData) => {
    form.clearErrors("root.server");
    const { success, error } = await registerAction({
      email: formData.email,
      password: formData.password,
      username: formData.username,
    });
    if (!success) {
      form.setError("root.server", {
        message: error.message,
        type: "server",
      });
      return;
    }
    router.push("/");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Введите данные для создания аккаунта
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          autoComplete="off"
          id="form-register"
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit)(event);
          }}
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="email@example.com"
                    required
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldSeparator />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="Пароль"
                    required
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="passwordConfirmation"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Повторите пароль
                  </FieldLabel>
                  <Input
                    {...field}
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="Повторите пароль"
                    required
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldSeparator />
            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Имя пользователя</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="Имя пользователя"
                    required
                    type="text"
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
          className="w-full"
          disabled={form.formState.isSubmitting}
          form="form-register"
          size="lg"
          type="submit"
        >
          {form.formState.isSubmitting ? "Создание аккаунта..." : "Создать аккаунт"}
        </Button>
      </CardFooter>
    </Card>
  );
}
