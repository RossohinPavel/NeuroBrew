import * as v from "valibot";


// Положительный идентификатор в пределах PostgreSQL integer.
export const postgresIdSchema = v.pipe(
  v.number(),
  v.integer(),
  v.minValue(1),
  v.maxValue(2147483647),
);

export type PostgresId = v.InferOutput<typeof postgresIdSchema>;
