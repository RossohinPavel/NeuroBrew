/** Описывает ожидаемую ошибку выполнения действия. */
export class ExpectedActionError extends Error {
  constructor(
    readonly name: string,
    readonly code?: string,
    readonly details?: string,
  ) {
    super(name);
  }
}
