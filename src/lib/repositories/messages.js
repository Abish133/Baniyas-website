import 'server-only';
import { query, queryOne } from '@/lib/db';

const toEntity = (row) => row && {
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  message: row.message,
  isRead: Boolean(row.is_read),
  ipAddress: row.ip_address,
  createdAt: row.created_at,
};

export async function createMessage({ name, email, phone, message, ipAddress }) {
  const result = await query(
    'INSERT INTO contact_messages (name, email, phone, message, ip_address) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, message, ipAddress]
  );
  return result.insertId;
}

/** Newest first. `search` matches name, email, phone or message text; `unreadOnly` filters. */
export async function listMessages({ search, unreadOnly } = {}) {
  const where = [];
  const params = [];
  if (unreadOnly) where.push('is_read = 0');
  if (search) {
    const like = `%${search.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    where.push('(name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)');
    params.push(like, like, like, like);
  }
  const sql = `SELECT * FROM contact_messages ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at DESC, id DESC`;
  return (await query(sql, params)).map(toEntity);
}

export async function markAllRead() {
  await query('UPDATE contact_messages SET is_read = 1 WHERE is_read = 0');
}

export async function findMessage(id) {
  return toEntity(await queryOne('SELECT * FROM contact_messages WHERE id = ?', [id]));
}

export async function markRead(id, isRead = true) {
  await query('UPDATE contact_messages SET is_read = ? WHERE id = ?', [isRead ? 1 : 0, id]);
}

export async function removeMessage(id) {
  await query('DELETE FROM contact_messages WHERE id = ?', [id]);
}

export async function countUnread() {
  const row = await queryOne('SELECT COUNT(*) AS total FROM contact_messages WHERE is_read = 0');
  return Number(row.total);
}
