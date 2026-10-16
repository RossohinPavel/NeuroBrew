import "server-only";


/** Выполняет запрос к backend API в серверном окружении frontend. */
export const apiFetch = <T>(
  _url: string,
  _options: RequestInit,
): Promise<T> => {
  throw new Error("API transport is not implemented");
};
