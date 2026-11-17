/** Собирает URI-путь из сегментов, кодируя каждый сегмент отдельно. */
export const buildUriPath = (...segments: (string | number | boolean)[]) => {
  return "/" + segments.map((segment) => encodeURIComponent(segment)).join("/");
};
