"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { CreateFileRequestSchema, type CreateFileRequest } from "@shared/contracts";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/shadcn/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/shadcn/ui/field";
import { Input } from "@/shared/shadcn/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/shadcn/ui/radio-group";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { fileCreateAction } from "./action";


type Props = {
  username: string;
  project: string;
  type?: string;
};

const fileTypes: CreateFileRequest["type"][] = ["skill", "rule", "agentsmd"];

/** Создает файл в выбранном проекте и возвращает к его странице после сохранения. */
export function FileCreateForm({ username, project, type }: Props) {
  const router = useRouter();

  const form = useForm<CreateFileRequest>({
    resolver: valibotResolver(CreateFileRequestSchema),
    defaultValues: {
      projectName: project,
      type: fileTypes.find((fileType) => fileType === type) ?? "agentsmd",
      name: "",
      content: "",
    },
  });

  const onSubmit = async (formData: CreateFileRequest) => {
    const { success, error } = await fileCreateAction(formData);

    if (!success) {
      form.setError("root.server", {
        message: error.message,
        type: "server",
      });
      return;
    }

    router.push(`/${encodeURIComponent(username)}/${encodeURIComponent(project)}`);
  };

  return (
    <form
      autoComplete="off"
      className="flex min-h-0 flex-1 flex-col gap-4"
      onChange={() => form.clearErrors("root.server")}
      onSubmit={(event) => {
        void form.handleSubmit(onSubmit)(event);
      }}
    >
      <Controller
        control={form.control}
        name="type"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <RadioGroup
              aria-invalid={fieldState.invalid}
              aria-label="Тип файла"
              className="flex w-auto gap-4"
              inputRef={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
              required
              value={field.value}
            >
              <Field className="w-auto" orientation="horizontal">
                <RadioGroupItem id="file-create-type-agentsmd" value="agentsmd" />
                <FieldLabel htmlFor="file-create-type-agentsmd">AGENTS.md</FieldLabel>
              </Field>
              <Field className="w-auto" orientation="horizontal">
                <RadioGroupItem id="file-create-type-rule" value="rule" />
                <FieldLabel htmlFor="file-create-type-rule">Правило</FieldLabel>
              </Field>
              <Field className="w-auto" orientation="horizontal">
                <RadioGroupItem id="file-create-type-skill" value="skill" />
                <FieldLabel htmlFor="file-create-type-skill">Скил</FieldLabel>
              </Field>
            </RadioGroup>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field className="w-64 max-w-full" data-invalid={fieldState.invalid}>
            <FieldLabel className="sr-only" htmlFor="file-create-name">Имя файла</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="file-create-name"
              placeholder="Имя файла"
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
      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Field className="min-h-0 flex-1" data-invalid={fieldState.invalid}>
            <FieldLabel 
              className="sr-only" 
              htmlFor="file-create-content"
            >
              Содержимое файла
            </FieldLabel>
            <Textarea
              {...field}
              aria-invalid={fieldState.invalid}
              className="min-h-0 flex-1 resize-none field-sizing-fixed"
              id="file-create-content"
              placeholder="Содержимое файла"
              required
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <div className="flex justify-end">
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </form>
  );
}
