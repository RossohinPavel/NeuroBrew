"use server";

import type { RegisterRequest } from "@shared/contracts";
import { cookies } from "next/headers";
import { register } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/server-action";
import { Cookies } from "@/entities/session";


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (formData: RegisterRequest): ActionResponse => {
  const result = await register(formData);

  if (result.status !== 201) {
    const message = result.data.message ?? "Не удалось создать аккаунт.";

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
