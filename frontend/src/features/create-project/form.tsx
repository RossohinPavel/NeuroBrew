"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/common/shadcn/ui/field";
import { Input } from "@/common/shadcn/ui/input";
import { createProjectAction } from "./action";
import { CreateProjectFormSchema, type CreateProjectFormData } from "./schema";


/** Предоставляет форму создания проекта. */
export function CreateProjectForm() {
  const form = useForm<CreateProjectFormData>({
    resolver: valibotResolver(CreateProjectFormSchema),
    defaultValues: { name: "" },
  });
  const onSubmit = async (formData: CreateProjectFormData) => {
    form.clearErrors("root.server");
    const { success, error } = await createProjectAction(formData);
    if (!success) {
      form.setError("root.server", {
        message: error.message,
        type: "server",
      });
      return;
    }
  };
  return (
    <form
      autoComplete="off"
      id="form-create-project"
      onSubmit={(event) => {
        void form.handleSubmit(onSubmit)(event);
      }}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Название</FieldLabel>
              <Input
                {...field}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                id={field.name}
                placeholder="Название"
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
      </FieldGroup>
    </form>
  );
}
