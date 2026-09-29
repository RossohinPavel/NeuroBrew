import { ConstraintError } from "./error";
import { DrizzleQueryError } from "drizzle-orm";
import postgres from "postgres";


const UNIQUE_VIOLATION_CODE = "23505";

/** Определяет, относится ли ошибка Drizzle к поддерживаемым ограничениям полей. */
function isConstraintError(error: unknown): error is DrizzleQueryError & {
  cause: postgres.PostgresError;
} {
  if (!(error instanceof DrizzleQueryError)) {
    return false;
  }
  if (!(error.cause instanceof postgres.PostgresError)) {
    return false;
  }
  return error.cause.code === UNIQUE_VIOLATION_CODE;
}

/** Оборачивает распознанную ошибку ограничения поля в `ConstraintError`. */
export function withConstraint<A extends unknown[], R>(operation: (...args: A) => R) {
  return async (...args: A) => {
    try {
      return await operation(...args);
    } catch (cause) {
      if (isConstraintError(cause)) {
        const violation = cause.cause;
        throw new ConstraintError(violation.message, {
          cause,
          schema: violation.schema_name,
          table: violation.table_name,
        });
      }
      throw cause;
    }
  };
}
