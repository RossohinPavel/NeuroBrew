"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { CreateProjectRequestSchema, type CreateProjectRequest } from "@shared/contracts";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/common/shadcn/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/common/shadcn/ui/field";
import { Input } from "@/common/shadcn/ui/input";
import { createProjectAction } from "./action";


/** Предоставляет форму создания нового проекта. */
export function CreateProjectForm() {
  const router = useRouter();

  const form = useForm<CreateProjectRequest>({
    resolver: valibotResolver(CreateProjectRequestSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (formData: CreateProjectRequest) => {
    const { success, data, error } = await createProjectAction(formData);

    if (!success) {
      form.setError("root.server", {
        message: error.message,
        type: "server",
      });
      return;
    }

    router.push(`/${encodeURIComponent(data.username)}/${encodeURIComponent(data.name)}`);
  };

  return (
    <div>
      <form
        autoComplete="off"
        id="form-create-project"
        onChange={() => form.clearErrors("root.server")}
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event);
        }}
      >
        <FieldSet>
          <FieldLegend>Новый проект</FieldLegend>
          <FieldDescription>
            Введите название для создания проекта
          </FieldDescription>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-project-name">Название проекта</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    id="create-project-name"
                    placeholder="Название проекта"
                    required
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {form.formState.errors.root?.server && (
              <FieldError errors={[form.formState.errors.root.server]} />
            )}
            <Field>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? "Создание проекта..." : "Создать проект"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
