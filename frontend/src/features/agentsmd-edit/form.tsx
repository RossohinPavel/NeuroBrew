"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { AgentsmdUpdateRequestSchema, type AgentsmdUpdateRequest } from "@shared/contracts";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/common/shadcn/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/common/shadcn/ui/field";
import { Textarea } from "@/common/shadcn/ui/textarea";
import { editAgentsmdAction } from "./action";


type Props = {
  isAuthor: boolean;
  content: string;
  projectName: string;
};

/** Предоставляет форму редактирования AGENTS.md проекта. */
export function AgentsmdEditForm({ content, isAuthor, projectName }: Props) {
  const router = useRouter();

  const form = useForm<AgentsmdUpdateRequest>({
    resolver: valibotResolver(AgentsmdUpdateRequestSchema),
    defaultValues: { projectName, content },
  });

  const onSubmit = async (formData: AgentsmdUpdateRequest) => {
    const { success, data, error } = await editAgentsmdAction(formData);

    if (!success) {
      form.setError("root.server", {
        message: error.message,
        type: "server",
      });
      return;
    }

    form.reset({
      projectName,
      content: data.content,
    });
    router.refresh();
  };

  return (
    <form
      onChange={() => form.clearErrors("root.server")}
      onSubmit={(event) => {
        void form.handleSubmit(onSubmit)(event);
      }}
    >
      <Field data-invalid={!!form.formState.errors.content}>
        <div className="flex min-h-9 flex-wrap justify-between gap-2">
          <FieldLabel htmlFor="agentsmd-content" className="text-xl font-semibold">
            AGENTS.md
          </FieldLabel>
          {isAuthor && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={form.formState.isSubmitting}
                onClick={() => form.reset()}
              >
                Отмена
              </Button>
              <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          )}
        </div>
        <Controller
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              id="agentsmd-content"
              aria-invalid={fieldState.invalid}
              readOnly={!isAuthor || form.formState.isSubmitting}
              className="h-64 resize-none font-mono focus-visible:border-input focus-visible:ring-0"
            />
          )}
        />
        <FieldDescription>
          Запишите в агентсмд самое основное для работы с проектом
        </FieldDescription>
        <FieldError errors={[form.formState.errors.content]} />
        <FieldError errors={[form.formState.errors.root?.server]} />
      </Field>
    </form>
  );
}
