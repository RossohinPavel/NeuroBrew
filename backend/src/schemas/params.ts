import * as v from "valibot";
import { toJsonSchema } from "@valibot/to-json-schema";


// Положительный идентификатор в пределах PostgreSQL integer.
export const postgresIdSchema = v.pipe(
  v.number(),
  v.integer(),
  v.minValue(1),
  v.maxValue(2147483647),
);

export type PostgresId = v.InferOutput<typeof postgresIdSchema>;

// Создаёт JSON Schema обязательных параметров пути с PostgreSQL ID.
export const createIdParamsSchema = (...names: string[]) => {
  const schema = v.object(Object.fromEntries(
    names.map((name) => [name, postgresIdSchema]),
  ));

  return toJsonSchema(schema, { typeMode: "input", errorMode: "throw" });
};
