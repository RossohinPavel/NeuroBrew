import { ENV } from "@/common/env";
import { ExpectedActionError } from "./errors";


/** Представляет успешный результат действия. */
type SuccessfulActionResponse<T> = { success: true; data: T; error: null };

/** Представляет ожидаемую бизнес-ошибку действия. */
type ExpectedErrorActionResponse = {
  success: false;
  data: null;
  error: Pick<ExpectedActionError, "name" | "code" | "details">;
};

/** Представляет результат выполнения безопасного действия. */
export type SafeActionResponse<T> = SuccessfulActionResponse<T> | ExpectedErrorActionResponse;

/** Оборачивает Server Action и отделяет ожидаемые бизнес-ошибки от системных сбоев. */
export function safeAction<Args extends unknown[], R>(actionFn: (...args: Args) => Promise<R>) {
  return async (...args: Args): Promise<SafeActionResponse<R>> => {
    try {
      const data = await actionFn(...args);
      return { success: true, data, error: null };
    } catch (error) {
      if (error instanceof ExpectedActionError) {
        return {
          success: false,
          data: null,
          error: { name: error.name, code: error.code, details: error.details },
        };
      }
      if (ENV.NODE_ENV !== "production") {
        throw error;
      }
      throw new Error("Internal Server Error");
    }
  };
}
