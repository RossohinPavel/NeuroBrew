import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";
import type { NextConfig } from "next";


// Подгружает переменные окружения из локального .env для разработки.
const localEnvPath = resolve(process.cwd(), "../.env");
if (existsSync(localEnvPath)) {
  loadEnvFile(localEnvPath);
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
