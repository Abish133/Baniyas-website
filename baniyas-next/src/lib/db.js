import 'server-only';
import mysql from 'mysql2/promise';

/**
 * Shared MySQL connection pool.
 * Stored on globalThis in development so hot reloads don't open new pools.
 */
function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    waitForConnections: true,
    charset: 'utf8mb4',
    dateStrings: false,
    // Return TINYINT(1) columns as numbers; repositories convert them to booleans.
    supportBigNumbers: true,
  });
}

const globalForDb = globalThis;
export const pool = globalForDb.__baniyasDbPool ?? createPool();
if (process.env.NODE_ENV !== 'production') globalForDb.__baniyasDbPool = pool;

/** Runs a query and returns the rows (SELECT) or the result header (INSERT/UPDATE/DELETE). */
export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

/** Runs a query and returns the first row or null. */
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] ?? null;
}

/** Runs `callback(connection)` inside a transaction. */
export async function transaction(callback) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
