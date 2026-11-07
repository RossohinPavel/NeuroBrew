"use server";

import { cookies } from "next/headers";
import { login } from "@/shared/api/generated/endpoints";
import type { ActionResponse } from "@/shared/types/server-action";
import * as Session from "@/entities/session";
import type { LoginRequest } from "@shared/contracts";


/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: LoginRequest): ActionResponse => {
  const result = await login(formData);

  if (result.status === 200) {
    const { accessToken, refreshToken, expiresIn } = result.data;
    const accessTokenCookie = Session.createAccessTokenCookie(accessToken, expiresIn);
    const refreshTokenCookie = Session.createRefreshTokenCookie(refreshToken);

    const cookieStore = await cookies();
    cookieStore.set(accessTokenCookie);
    cookieStore.set(refreshTokenCookie);

    return {
      success: true,
      data: true,
    };
  }

  if (result.status === 401) {
    return {
      success: false,
      error: { message: result.data.message ?? "Не удалось войти." },
    };
  }

  throw new Error(`Failed to log in: ${result.status}`);
};
