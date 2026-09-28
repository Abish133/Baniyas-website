// Shared helpers for the CLI scripts (migrate / seed / create-admin).
import mysql from 'mysql2/promise';

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`✖ Missing environment variable ${name}. Copy .env.example to .env and fill it in.`);
    process.exit(1);
  }
  return value;
}

export async function connect({ withDatabase = true } = {}) {
  return mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: requireEnv('DB_USER'),
    password: process.env.DB_PASSWORD || '',
    database: withDatabase ? requireEnv('DB_NAME') : undefined,
    multipleStatements: true,
    charset: 'utf8mb4',
  });
}
