import postgres from "postgres";


const UNIQUE_VIOLATION_CODE = "23505";

/** Возвращает ошибку PostgreSQL из исходного значения или стандартной цепочки причин. */
function getPostgresError(error: unknown) {
  if (error instanceof postgres.PostgresError) {
    return error;
  }
  if (error instanceof Error && error.cause instanceof postgres.PostgresError) {
    return error.cause;
  }
  return undefined;
}

/** Определяет, вызвана ли ошибка нарушением ограничения уникальности PostgreSQL. */
export function isUniqueConstraintViolation(error: unknown) {
  return getUniqueConstraintViolation(error) !== undefined;
}

/** Возвращает распознанную ошибку нарушения уникальности PostgreSQL. */
export function getUniqueConstraintViolation(error: unknown) {
  const postgresError = getPostgresError(error);
  if (postgresError?.code !== UNIQUE_VIOLATION_CODE) {
    return undefined;
  }
  return postgresError;
}
