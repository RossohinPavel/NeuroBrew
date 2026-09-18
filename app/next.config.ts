import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";
import type { NextConfig } from "next";


/** Подгружает переменные окружения из корневого .env. */
(() => {
  const rootEnvPath = resolve(process.cwd(), "../.env");
  if (existsSync(rootEnvPath)) {
    loadEnvFile(rootEnvPath);
  }
})();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
