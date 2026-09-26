import { loadEnvFile } from 'node:process';
import { defineConfig } from 'drizzle-kit';
import { Connection } from './src/';

if (process.env.DB_HOST === undefined) {
  loadEnvFile('../../.env');
}

const connection = new Connection({
  hostname: process.env.DB_HOST!,
  port: process.env.DB_PORT!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

export default defineConfig({
  out: './migrations/',
  schema: './src/schema/index.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: connection.url,
  },
});
