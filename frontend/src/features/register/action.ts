"use server";

import { createAuthRepository } from "@shared/database";
import { hash } from "argon2";
import { cookies } from "next/headers";
import * as v from "valibot";
import { DB } from "@/common/db-connection";
import * as Session from "@/entities/session";
import { RegisterDataSchema, type RegisterData } from "./schema";


const { createUser } = createAuthRepository(DB);


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (data: RegisterData) => {
  try {
    const { email, password, username } = await v.parseAsync(RegisterDataSchema, data);
    const passwordHash = await hash(password);
    const user = await createUser({ email, passwordHash, username });
    if (!user) {
      throw new Error("Не удалось создать пользователя");
    }
    const [accessToken, refreshToken] = await Promise.all([
      Session.createAccessToken({ userId: user.id }),
      Session.createRefreshToken({ userId: user.id }),
    ]);
    const cookieStore = await cookies();
    cookieStore.set({ ...Session.cookies.accessToken, value: accessToken });
    cookieStore.set({ ...Session.cookies.refreshToken, value: refreshToken });
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
