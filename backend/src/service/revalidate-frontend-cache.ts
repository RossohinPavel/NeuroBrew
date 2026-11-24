import { ENV } from "../config/index.js";


/** Передаёт теги кеша frontend API для ревалидации. */
export const revalidateFrontendCache = async (tags: string[]) => {
  const response = await fetch(`${ENV.FRONTEND_API_URL}/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tags }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Frontend cache revalidation failed: ${response.status}`);
  }
};
