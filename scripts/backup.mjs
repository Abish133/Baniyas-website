// Backs up everything the admin can change: the MySQL database and the uploads folder.
// Creates backups/<date-time>/database.sql and backups/<date-time>/uploads/.
// Usage: npm run backup            (keeps the 14 most recent backups)
//        npm run backup -- --keep 30
// Restore: mysql -u USER -p DB_NAME < backups/<date-time>/database.sql
//          and copy backups/<date-time>/uploads/ back to UPLOAD_DIR.
import fs from 'node:fs/promises';
import path from 'node:path';
import { connect } from './_db.mjs';

const ROOT = process.cwd();
const BACKUP_DIR = path.resolve(ROOT, process.env.BACKUP_DIR || './backups');
const UPLOAD_DIR = path.resolve(ROOT, process.env.UPLOAD_DIR || './storage/uploads');
const keepArg = process.argv.indexOf('--keep');
const KEEP = keepArg > -1 ? Number(process.argv[keepArg + 1]) : 14;

const stamp = () => new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);

function sqlValue(conn, value) {
  if (value === null || value === undefined) return 'NULL';
  if (value instanceof Date) return conn.escape(value.toISOString().slice(0, 19).replace('T', ' '));
  if (Buffer.isBuffer(value)) return `0x${value.toString('hex')}`;
  return conn.escape(value);
}

async function dumpDatabase(conn, file) {
  const out = await fs.open(file, 'w');
  try {
    await out.write(`-- Bani Yas website backup, ${new Date().toISOString()}\nSET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n`);
    const [tables] = await conn.query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");
    for (const row of tables) {
      const table = Object.values(row)[0];
      const [[create]] = await conn.query(`SHOW CREATE TABLE \`${table}\``);
      await out.write(`DROP TABLE IF EXISTS \`${table}\`;\n${create['Create Table']};\n\n`);
      const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
      for (let i = 0; i < rows.length; i += 200) {
        const chunk = rows.slice(i, i + 200);
        const columns = Object.keys(chunk[0]).map((c) => `\`${c}\``).join(', ');
        const values = chunk.map((r) => `(${Object.values(r).map((v) => sqlValue(conn, v)).join(', ')})`).join(',\n');
        await out.write(`INSERT INTO \`${table}\` (${columns}) VALUES\n${values};\n`);
      }
      await out.write('\n');
      console.log(`  ${table}: ${rows.length} row(s)`);
    }
    await out.write('SET FOREIGN_KEY_CHECKS = 1;\n');
  } finally {
    await out.close();
  }
}

async function removeOldBackups() {
  const entries = (await fs.readdir(BACKUP_DIR, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name).sort();
  for (const name of entries.slice(0, Math.max(0, entries.length - KEEP))) {
    await fs.rm(path.join(BACKUP_DIR, name), { recursive: true, force: true });
    console.log(`  removed old backup ${name}`);
  }
}

async function main() {
  const target = path.join(BACKUP_DIR, stamp());
  await fs.mkdir(target, { recursive: true });
  console.log(`→ Backing up to ${target}`);

  const conn = await connect();
  try {
    await dumpDatabase(conn, path.join(target, 'database.sql'));
  } finally {
    await conn.end();
  }

  try {
    await fs.cp(UPLOAD_DIR, path.join(target, 'uploads'), { recursive: true });
    console.log('  uploads copied');
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.log('  no uploads folder yet, skipped');
  }

  if (Number.isFinite(KEEP) && KEEP > 0) await removeOldBackups();
  console.log('✔ Backup complete.');
}

main().catch((err) => {
  console.error('✖ Backup failed:', err.message);
  process.exit(1);
});
