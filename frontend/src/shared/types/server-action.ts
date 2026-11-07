/** Описывает успешный результат Server Action. */
export type ActionSuccess<T = unknown> = {
  success: true;
  data: T;
  error?: undefined;
};

/** Описывает ожидаемую ошибку Server Action. */
export type ActionError = {
  success: false;
  data?: undefined;
  error: { message: string };
};

/** Описывает асинхронный результат выполнения Server Action. */
export type ActionResponse<T = unknown> = Promise<
  | ActionSuccess<T>
  | ActionError
>;
