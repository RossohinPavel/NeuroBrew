import "server-only";

import { ENV } from "@/common/env";


/** Выполняет запрос к backend API в серверном окружении frontend. */
export const apiFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
  try {
    const response = await fetch(new URL(url, ENV.BACKEND_URL), {
      ...options,
      signal: AbortSignal.timeout(30_000),
    });
    const data = await response.json() as unknown;

    if (response.status >= 500) {
      throw new Error(`Backend API responded with status ${response.status}`);
    }

    return { data, status: response.status, headers: response.headers } as T;
  } catch (error) {
    throw new Error("Failed to process backend API request", { cause: error });
  }
};
