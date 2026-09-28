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

export async function listMessages() {
  return (await query('SELECT * FROM contact_messages ORDER BY created_at DESC, id DESC')).map(toEntity);
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
