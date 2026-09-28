"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { registerAction } from "./action";
import { RegisterFormSchema, type RegisterFormData } from "./schema";

import styles from "./form.module.css";

/** Предоставляет форму создания нового аккаунта. */
export function RegisterForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormData>({
    resolver: valibotResolver(RegisterFormSchema),
  });
  const submitForm = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("username", values.username);
    await registerAction(formData);
  });
  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(event) => {
        void submitForm(event);
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        {...register("email")}
        aria-describedby={errors.email ? "email-error" : undefined}
        aria-invalid={Boolean(errors.email)}
        id="email"
        type="email"
        placeholder="Email"
      />
      {errors.email?.message && (
        <p id="email-error" role="alert">{errors.email.message}</p>
      )}
      <label htmlFor="password">Пароль</label>
      <input
        {...register("password")}
        aria-describedby={errors.password ? "password-error" : undefined}
        aria-invalid={Boolean(errors.password)}
        id="password"
        type="password"
        placeholder="Пароль"
      />
      {errors.password?.message && (
        <p id="password-error" role="alert">{errors.password.message}</p>
      )}
      <label htmlFor="passwordConfirmation">Повторите пароль</label>
      <input
        {...register("passwordConfirmation")}
        aria-describedby={
          errors.passwordConfirmation ? "password-confirmation-error" : undefined
        }
        aria-invalid={Boolean(errors.passwordConfirmation)}
        id="passwordConfirmation"
        type="password"
        placeholder="Повторите пароль"
      />
      {errors.passwordConfirmation?.message && (
        <p id="password-confirmation-error" role="alert">
          {errors.passwordConfirmation.message}
        </p>
      )}
      <label htmlFor="username">Имя пользователя</label>
      <input
        {...register("username")}
        aria-describedby={errors.username ? "username-error" : undefined}
        aria-invalid={Boolean(errors.username)}
        id="username"
        type="text"
        placeholder="Имя пользователя"
      />
      {errors.username?.message && (
        <p id="username-error" role="alert">{errors.username.message}</p>
      )}
      <button disabled={isSubmitting} type="submit">Создать аккаунт</button>
    </form>
  );
}
