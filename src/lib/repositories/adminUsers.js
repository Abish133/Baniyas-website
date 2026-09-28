import 'server-only';
import { query, queryOne } from '@/lib/db';

const toEntity = (row) => row && { id: row.id, name: row.name, email: row.email, lastLoginAt: row.last_login_at };

export async function findAdminById(id) {
  if (!Number.isInteger(id) || id <= 0) return null;
  return toEntity(await queryOne('SELECT id, name, email, last_login_at FROM admin_users WHERE id = ?', [id]));
}

/** Includes the password hash — only for authentication. */
export async function findAdminCredentialsByEmail(email) {
  return queryOne('SELECT id, name, email, password_hash FROM admin_users WHERE email = ?', [email]);
}

export async function findAdminCredentialsById(id) {
  return queryOne('SELECT id, password_hash FROM admin_users WHERE id = ?', [id]);
}

export async function touchLastLogin(id) {
  await query('UPDATE admin_users SET last_login_at = NOW() WHERE id = ?', [id]);
}

export async function updatePassword(id, passwordHash) {
  await query('UPDATE admin_users SET password_hash = ? WHERE id = ?', [passwordHash, id]);
}

export async function updateProfile(id, { name, email }) {
  await query('UPDATE admin_users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
}

export async function emailTaken(email, excludeId) {
  const row = await queryOne('SELECT id FROM admin_users WHERE email = ? AND id <> ?', [email, excludeId]);
  return Boolean(row);
}
