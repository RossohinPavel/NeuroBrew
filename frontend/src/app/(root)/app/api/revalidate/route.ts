import * as v from "valibot";
import { RevalidateRequestSchema } from "./schema";


/** Проверяет список тегов запроса и выводит его в серверную консоль. */
export const POST = async (request: Request) => {
  try {
    const body: unknown = await request.json();
    const data = v.parse(RevalidateRequestSchema, body);

    console.log(data);

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
};
