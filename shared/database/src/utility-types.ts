/** Разрешает объекту содержать только одно выбранное свойство исходного типа. */
export type SingleProperty<Type, Field extends keyof Type> = Pick<Type, Field> &
  Partial<Record<Exclude<keyof Type, Field>, never>>;
