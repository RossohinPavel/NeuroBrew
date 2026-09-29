/**
 * Ограничения полей базы данных закрепляют бизнес-инварианты. Репозитории
 * оборачивают только распознанные нарушения, чтобы вышестоящий код мог отличать
 * их от прочих ошибок и обрабатывать как ожидаемые бизнес-сценарии.
 * Неопознанные ошибки не подавляются и передаются без изменения.
 *
 * Сообщение и контекст ошибки должны точно отражать установленную базой данных
 * причину нарушения. `ConstraintError` предоставляет программный интерфейс и
 * не предназначен для прямого показа пользователю.
 */

/** Описывает контекст нарушения ограничения поля таблицы. */
export interface ConstraintErrorOptions extends ErrorOptions {
  cause: unknown;
  schema: string | undefined;
  table: string | undefined;
}

/** Представляет ошибку ограничения полей таблицы. */
export class ConstraintError extends Error {
  readonly schema: string | undefined;
  readonly table: string | undefined;

  constructor(message: string, options: ConstraintErrorOptions) {
    super(message, options);
    this.name = new.target.name;
    this.schema = options.schema;
    this.table = options.table;
  }
}
