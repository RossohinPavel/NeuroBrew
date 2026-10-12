import { Injectable } from "@nestjs/common";
import * as v from "valibot";


export const HealthSchema = v.object({
  backend: v.literal("ok"),
  database: v.picklist(["ready", "unavailable"]),
});

export type Health = v.InferOutput<typeof HealthSchema>;


@Injectable()
export class AppService {
  health(): Health {
    return { backend: "ok", database: "unavailable"};
  }
}
