import { Injectable } from "@nestjs/common";
import { toJsonSchema } from "@valibot/to-json-schema";
import * as v from "valibot";
import { DatabaseService } from "./database/database.service.js";


export const HealthSchema = v.object({
  backend: v.literal("ok"),
  database: v.picklist(["ready", "unavailable"]),
});

export const HealthJsonSchema = toJsonSchema(HealthSchema);

export type Health = v.InferOutput<typeof HealthSchema>;

@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService) {}

  async health(): Promise<Health> {
    const databaseReady = await this.db.checkConnection();
    return {
      backend: "ok",
      database: databaseReady ? "ready" : "unavailable",
    };
  }
}
