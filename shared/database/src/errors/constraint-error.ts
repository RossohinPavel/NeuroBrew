/**
 * В этой библиотеке ограничения полей базы данных закрепляют бизнес-инварианты.
 * Репозитории оборачивают в `ConstraintError` только распознанные нарушения,
 * чтобы вышестоящий код мог отличать их от прочих ошибок и обрабатывать как
 * ожидаемые бизнес-сценарии. Неопознанные ошибки не подавляются и передаются
 * без изменения.
 *
 * При оборачивании сообщение и контекст должны точно отражать установленную
 * базой данных причину нарушения. `ConstraintError` предоставляет программный
 * интерфейс для обработки ошибки и не предназначен для прямого показа
 * пользователю; преобразование в пользовательское сообщение выполняет
 * вышестоящий слой.
 */

/** Описывает контекст нарушения ограничения таблицы. */
export interface ConstraintErrorOptions extends ErrorOptions {
  cause: unknown;
  schema: string;
  table: string;
}

/** Представляет ошибку ограничения полей таблицы. */
export class ConstraintError extends Error {
  readonly schema: string;
  readonly table: string;

  constructor(message: string, options: ConstraintErrorOptions) {
    super(message, options);
    this.name = new.target.name;
    this.schema = options.schema;
    this.table = options.table;
  }
}
