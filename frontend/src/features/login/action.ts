"use server";

import type { LoginRequest } from "@shared/contracts";
import { cookies } from "next/headers";
import { login, type loginResponse } from "@/common/api/generated/endpoints";
import type { DistributiveOmit } from "@/common/api/types";
import { Cookies } from "@/entities/session";


type LoginActionResponse = DistributiveOmit<loginResponse, "headers">;

/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: LoginRequest) => {
  const result = await login(formData);

  if (result.status === 200) {
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
  }

  return { data: result.data, status: result.status } as LoginActionResponse;
};
