import * as v from "valibot";


/** Представляет валидированный payload либо ошибку валидации или выполнения. */
export type PayloadParseResult<T extends v.GenericSchema> =
  | { status: "valid"; payload: v.InferOutput<T>, error?: undefined }
  | { status: "valibotError"; payload?: undefined, error: v.ValiError<T> }
  | { status: "systemError"; payload?: undefined, error: Error };

/** Валидирует неизвестное значение по схеме и классифицирует результат проверки. */
export const parse = async <T extends v.GenericSchema>(
  schema: T,
  payload: unknown,
): Promise<PayloadParseResult<T>> => {
  try {
    const parsedPayload = await v.parseAsync(schema, payload);
    return { status: "valid", payload: parsedPayload };
  } catch (error) {
    if (v.isValiError<T>(error)) {
      return { status: "valibotError", error };
    }
    return { status: "systemError", error: error as Error };
  }
};
