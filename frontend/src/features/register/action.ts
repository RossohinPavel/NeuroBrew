"use server";

import { cookies } from "next/headers";
import { register } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/server-action";
import * as Session from "@/entities/session";
import type { RegisterRequest } from "@shared/contracts";


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (formData: RegisterRequest): ActionResponse => {
  const result = await register(formData);

  if (result.status !== 201) {
    const message = result.data.message ?? "Не удалось создать аккаунт.";

    return { success: false, error: { message } };
  }

  const { accessToken, refreshToken, expiresIn } = result.data;
  const accessTokenCookie = Session.createAccessTokenCookie(accessToken, expiresIn);
  const refreshTokenCookie = Session.createRefreshTokenCookie(refreshToken);

  const cookieStore = await cookies();
  cookieStore.set(accessTokenCookie);
  cookieStore.set(refreshTokenCookie);

  return { success: true, data: true };
};
