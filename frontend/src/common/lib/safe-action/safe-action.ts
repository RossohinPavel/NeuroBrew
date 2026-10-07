import "server-only";

import { ENV } from "@/common/env";
import { ExpectedActionError } from "./errors";


/** Представляет результат выполнения безопасного действия. */
export type SafeActionResponse<T> =
  | { success: true; data: T; error?: undefined }
  | { success: false; data?: undefined; error: { message: string } };
// В нексте серверное действие без обертки вообще ничего не должно возвращать.
// Если же мы используем обертку, как эта, то она должна возвращать сериализуемый в json объект.

/** Оборачивает Server Action и отделяет ожидаемые бизнес-ошибки от системных сбоев. */
export function safeAction<Args extends unknown[], R>(actionFn: (...args: Args) => Promise<R>) {
  return async (...args: Args): Promise<SafeActionResponse<R>> => {
    try {
      const data = await actionFn(...args);
      return { success: true, data };
    } catch (error) {
      if (error instanceof ExpectedActionError) {
        return { success: false, error: { message: error.message } };
      }
      if (ENV.NODE_ENV === "production") {
        throw new Error("Internal Server Error");
      }
      throw error;
    }
  };
}
