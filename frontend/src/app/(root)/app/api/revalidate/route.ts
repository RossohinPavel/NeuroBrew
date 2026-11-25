import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { RevalidateRequestSchema } from "./schema";


/** Проверяет список тегов запроса и запускает ревалидацию кеша для каждого из них. */
export const POST = async (request: Request) => {
  try {
    const body: unknown = await request.json();
    const data = v.parse(RevalidateRequestSchema, body);

    data.tags.forEach(t => revalidateTag(t, "max"));

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
};
