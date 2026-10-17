"use server";

import type { LoginRequest } from "@shared/contracts";
import { cookies } from "next/headers";
import { login } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/server-action";
import { Cookies } from "@/entities/session";


/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: LoginRequest): ActionResponse => {
  const result = await login(formData);

  if (result.status !== 200) {
    const message = result.data.message ?? "Не удалось войти.";

    return { success: false, error: { message } };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    ...Cookies.accessToken,
    maxAge: Math.max(result.data.expiresIn - 30, 1),
    value: result.data.accessToken,
  });
  cookieStore.set({
    ...Cookies.refreshToken,
    value: result.data.refreshToken,
  });

  return { success: true, data: true };
};
