"use client";

import { useActionState } from "react";
import { testAction } from "./action";


/** Предоставляет кнопку для проверки выполнения серверного действия. */
export function TestActionForm() {
  const [result, formAction, isPending] = useActionState(testAction, null);
  return (
    <form action={formAction}>
      <button disabled={isPending} type="submit">
        {isPending ? "Выполнение..." : "Выполнить тестовое действие"}
      </button>
      {result?.success && <p>{result.data}</p>}
      {result && !result.success && <p role="alert">{result.error.name}</p>}
    </form>
  );
}
