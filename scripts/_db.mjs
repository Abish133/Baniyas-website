// Shared helpers for the CLI scripts (migrate / seed / create-admin / backup).
import fs from 'node:fs';
import { parseEnv } from 'node:util';
import mysql from 'mysql2/promise';

/**
 * Loads the same env files as Next.js: .env.production when NODE_ENV=production (e.g. inside the
 * Docker image), otherwise .env.development; plus optional .env.local / .env overrides.
 * Variables that are already set (CI, Coolify, the shell) are never overwritten.
 */
function loadEnvFiles() {
  const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
  for (const file of [`.env.${mode}.local`, '.env.local', `.env.${mode}`, '.env']) {
    if (!fs.existsSync(file)) continue;
    for (const [key, value] of Object.entries(parseEnv(fs.readFileSync(file, 'utf8')))) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}
loadEnvFiles();

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`✖ Missing environment variable ${name}. Add it to .env.development / .env.production.`);
    process.exit(1);
  }
  return value;
}

// Passwords that appear in this public repository (old .env.example / docs) must never be used.
const PUBLIC_EXAMPLE_PASSWORDS = ['baniyas2026'];
export const isPublicExamplePassword = (password) => PUBLIC_EXAMPLE_PASSWORDS.includes(password);

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
