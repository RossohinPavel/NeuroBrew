import { Injectable, type OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { type Env } from "../config/env.js";


@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly client: ReturnType<typeof postgres>;
  readonly connection: ReturnType<typeof drizzle>;

  constructor(private readonly config: ConfigService<Env, true>) {
    this.client = this.createClient();
    this.connection = this.createConnection();
  }

  async checkConnection() {
    try {
      await this.connection.execute(sql`select 1`);
      return true;
    } catch {
      return false;
    }
  }

  private createClient() {
    const url = this.config.getOrThrow("DATABASE_URL", { infer: true });
    return postgres(url);
  }

  private createConnection() {
    return drizzle({ client: this.client });
  }

  async onApplicationShutdown() {
    await this.client.end();
  }
}
