import { ConstraintError } from "./constraint-error";
import { getUniqueConstraintViolation } from "./postgres-error";


type AsyncMethod<TThis, TArguments extends unknown[], TResult> = (
  this: TThis,
  ...arguments_: TArguments
) => Promise<TResult>;

/** Оборачивает распознанное нарушение уникальности в ошибку ограничения. */
export function translateUniqueConstraint<
  TThis,
  TArguments extends unknown[],
  TResult,
>(
  method: AsyncMethod<TThis, TArguments, TResult>,
  _context: ClassMethodDecoratorContext<
    TThis,
    AsyncMethod<TThis, TArguments, TResult>
  >,
) {
  return async function (this: TThis, ...arguments_: TArguments) {
    try {
      return await method.call(this, ...arguments_);
    } catch (cause) {
      const violation = getUniqueConstraintViolation(cause);
      if (violation === undefined) {
        throw cause;
      }
      if (violation.schema_name === undefined || violation.table_name === undefined) {
        throw cause;
      }
      throw new ConstraintError(violation.message, {
        cause,
        schema: violation.schema_name,
        table: violation.table_name,
      });
    }
  };
}
