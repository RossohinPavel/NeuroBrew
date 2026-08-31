import { loadEnvFile } from 'node:process';
import { defineConfig } from 'drizzle-kit';
import { Connection, type BuildUrlParams } from './src/db/repo';

if (process.env.DB_HOST === undefined) {
  loadEnvFile('../.env');
}

const databaseParams: BuildUrlParams = {
  protocol: 'postgresql',
  hostname: process.env.DB_HOST!,
  port: process.env.DB_PORT!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
};

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: new Connection(databaseParams).url,
  },
});
