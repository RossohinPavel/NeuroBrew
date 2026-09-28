"use server";

import { hash } from "argon2";
import { cookies } from "next/headers";
import * as v from "valibot";
import { DB } from "@/common/db";
import { Cookies, JWT } from "@/entities/session";
import { RegisterDataSchema, type RegisterData } from "./schema";


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (data: RegisterData) => {
  try {
    const { email, password, username } = await v.parseAsync(RegisterDataSchema, data);
    const passwordHash = await hash(password);
    const user = await DB.auth.createUser({ email, passwordHash, username });
    if (!user) {
      throw new Error("Не удалось создать пользователя");
    }
    const [accessToken, refreshToken] = await Promise.all([
      JWT.create("access", { userId: user.id }),
      JWT.create("refresh", { userId: user.id }),
    ]);
    const cookieStore = await cookies();
    cookieStore.set({ ...Cookies.accessToken, value: accessToken });
    cookieStore.set({ ...Cookies.refreshToken, value: refreshToken });
    return { success: true } as const; // Успешный результат.
  } catch (error) {
    if (v.isValiError(error)) {
      return { // Ожидаемая ошибка с безопасным сообщением для клиента.
        message: "Сервер отклонил данные регистрации.",
        success: false,
      } as const;
    }
    // TODO: Включить серверное логирование нераспознанных ошибок.
    // console.error(error);
    throw new Error("Internal Server Error"); // Обезличенная ошибка для клиента.
  }
};
