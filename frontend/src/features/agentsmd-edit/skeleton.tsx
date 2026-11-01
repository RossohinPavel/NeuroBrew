import { Field, FieldDescription, FieldLabel } from "@/common/shadcn/ui/field";
import { Textarea } from "@/common/shadcn/ui/textarea";


/** Сохраняет размеры поля AGENTS.md во время загрузки содержимого. */
export function AgentsmdEditSkeleton() {
  return (
    <Field>
      <div className="flex min-h-9 flex-wrap justify-between gap-2">
        <FieldLabel htmlFor="agentsmd-content" className="text-xl font-semibold">
          AGENTS.md
        </FieldLabel>
      </div>
      <Textarea
        id="agentsmd-content"
        aria-hidden="true"
        disabled
        className="h-64 resize-none animate-pulse"
      />
      <FieldDescription>
        Запишите в агентсмд самое основное для работы с проектом
      </FieldDescription>
    </Field>
  );
}
