import "server-only";

import { ENV } from "@/shared/env";


/** Дополняет опции запроса обработчиком ответа API-клиента. */
export type ApiRequestInit = RequestInit & {
  /** Возвращает исходный ответ или ответ повторного запроса, используя его URL и опции. */
  processResponse?: (
    response: Response,
    url: URL,
    options: ApiRequestInit,
  ) => Response | Promise<Response>;
};

/** Выполняет запрос к backend API в серверном окружении frontend. */
export const apiFetch = async <T>(url: string | URL, options: ApiRequestInit): Promise<T> => {
  const { processResponse, ...fetchOptions } = options;

  const requestUrl = new URL(url, ENV.BACKEND_URL);

  let response = await fetch(requestUrl, {
    ...fetchOptions,
    signal: AbortSignal.timeout(10_000),
  });

  if (processResponse) {
    response = await processResponse(response, requestUrl, fetchOptions);
  }

  const data = await response.json() as unknown;

  if (response.status >= 500) {
    throw new Error(
      `Backend responded: ${response.status}`,
      ENV.NODE_ENV === "development" ? { cause: data } : undefined,
    );
  }
  return { data, status: response.status, headers: response.headers } as T;
};
