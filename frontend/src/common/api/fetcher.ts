import "server-only";

import { ENV } from "@/common/env";


/** Дополняет опции запроса обработчиками заголовков и ответа API-клиента. */
export type ApiRequestInit = RequestInit & {
  /** Подготавливает заголовки перед выполнением запроса. */
  prepareHeaders?: (headers: Headers) => Headers | Promise<Headers>;

  /** Возвращает исходный ответ или ответ повторного запроса, используя его URL и опции. */
  processResponse?: (
    response: Response,
    url: URL,
    options: ApiRequestInit,
  ) => Response | Promise<Response>;
};

/** Выполняет запрос к backend API в серверном окружении frontend. */
export const apiFetch = async <T>(url: string, options: ApiRequestInit): Promise<T> => {
  const { prepareHeaders, processResponse, ...fetchOptions } = options;
  const requestUrl = new URL(url, ENV.BACKEND_URL);

  const preparedHeaders = prepareHeaders
    ? await prepareHeaders(new Headers(fetchOptions.headers))
    : fetchOptions.headers;
  const requestOptions = {
    ...fetchOptions,
    headers: preparedHeaders,
    signal: AbortSignal.timeout(30_000),
  };

  const initialResponse = await fetch(requestUrl, requestOptions);
  const response = processResponse
    ? await processResponse(initialResponse, requestUrl, requestOptions)
    : initialResponse;
  const data = await response.json() as unknown;

  if (response.status >= 500) {
    throw new Error(
      `Backend responded: ${response.status}`,
      ENV.NODE_ENV === "development" ? { cause: data } : undefined,
    );
  }

  return { data, status: response.status, headers: response.headers } as T;
};
