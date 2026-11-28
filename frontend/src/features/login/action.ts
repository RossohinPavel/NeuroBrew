"use server";

import { cookies } from "next/headers";
import * as session from "@/entities/session";
import { login } from "@/shared/api/generated/endpoints";
import type { ActionResponse } from "@/shared/types/server-action";
import type { LoginRequest } from "@shared/contracts";


/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: LoginRequest): ActionResponse => {
  const result = await login(formData);

  if (result.status === 200) {
    const cookieStore = await cookies();
    session.set(cookieStore, result.data);

    return { success: true, data: true };
  }

  if (result.status === 401) {
    return {
      success: false,
      error: { message: result.data.message ?? "Не удалось войти." },
    };
  }

  throw new Error(`Failed to log in: ${result.status}`);
};
