import * as v from "valibot";


/** Принимает непустой список тегов кеша Next.js для ревалидации. */
export const RevalidateRequestSchema = v.object({
  tags: v.pipe(
    v.array(v.pipe(
      v.string(),
      v.minLength(1),
      v.maxLength(256),
    )),
    v.minLength(1),
  ),
});
