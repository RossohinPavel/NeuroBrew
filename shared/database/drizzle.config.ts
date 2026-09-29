import { loadEnvFile } from 'node:process';
import { defineConfig } from 'drizzle-kit';
import { buildConnectionUrl } from './src/';

if (process.env.DB_HOST === undefined) {
  loadEnvFile('../../.env');
}

const url = buildConnectionUrl({
  hostname: process.env.DB_HOST!,
  port: process.env.DB_PORT!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

export default defineConfig({
  out: './drizzle/',
  schema: './src/schema/index.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url,
  },
});
