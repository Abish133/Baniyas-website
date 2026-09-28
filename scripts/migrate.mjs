// Applies every SQL file in database/migrations (in name order) exactly once.
// Usage: npm run db:migrate
import fs from 'node:fs/promises';
import path from 'node:path';
import { connect, requireEnv } from './_db.mjs';

const MIGRATIONS_DIR = path.join(process.cwd(), 'database', 'migrations');

async function ensureDatabase() {
  const dbName = requireEnv('DB_NAME');
  const conn = await connect({ withDatabase: false });
  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName.replace(/`/g, '')}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } catch (err) {
    // Shared hosting users often cannot create databases; the DB must then exist already.
    console.warn(`! Could not create database automatically (${err.code}). Continuing…`);
  } finally {
    await conn.end();
  }
}

async function main() {
  await ensureDatabase();
  const conn = await connect();
  try {
    await conn.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      name VARCHAR(191) NOT NULL PRIMARY KEY,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    const [rows] = await conn.query('SELECT name FROM schema_migrations');
    const applied = new Set(rows.map((r) => r.name));
    const files = (await fs.readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith('.sql')).sort();

    let count = 0;
    for (const file of files) {
      if (applied.has(file)) continue;
      const sql = await fs.readFile(path.join(MIGRATIONS_DIR, file), 'utf8');
      console.log(`→ Applying ${file}`);
      await conn.query(sql);
      await conn.query('INSERT INTO schema_migrations (name) VALUES (?)', [file]);
      count += 1;
    }
    console.log(count ? `✔ Applied ${count} migration(s).` : '✔ Database is up to date.');
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error('✖ Migration failed:', err.message);
  process.exit(1);
});
