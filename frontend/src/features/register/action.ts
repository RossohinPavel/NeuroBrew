"use server";

import { cookies } from "next/headers";
import { register } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/types/server-action";
import * as Session from "@/entities/session";
import type { RegisterRequest } from "@shared/contracts";


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (formData: RegisterRequest): ActionResponse => {
  const result = await register(formData);

  if (result.status === 201) {
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

  if (result.status === 409) {
    return {
      success: false,
      error: { message: result.data.message ?? "Не удалось создать аккаунт." },
    };
  }

  throw new Error(`Failed to register: ${result.status}`);
};
