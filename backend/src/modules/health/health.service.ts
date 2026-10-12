import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service.js";
import { Health } from "./health.schema.js";


@Injectable()
export class HealthService {
  constructor(private readonly db: DatabaseService) {}

  async health(): Promise<Health> {
    const databaseReady = await this.db.checkConnection();
    return {
      backend: "ok",
      database: databaseReady ? "ready" : "unavailable",
    };
  }
}
