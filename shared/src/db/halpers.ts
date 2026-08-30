export interface BuildDatabaseUrlParams {
  protocol: string;
  hostname: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

export function buildDatabaseUrl(params: BuildDatabaseUrlParams) {
  const url = new URL(`${params.protocol}://localhost`);
  url.hostname = params.hostname;
  url.port = params.port;
  url.username = params.username;
  url.password = params.password;
  url.pathname = params.database;
  return url.toString();
}
