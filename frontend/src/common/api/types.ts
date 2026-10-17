/** Удаляет указанный ключ из каждого варианта объединения типов. */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;
