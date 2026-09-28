import 'server-only';
import { query } from '@/lib/db';

const toEntity = (row) => ({
  id: row.id,
  adminId: row.admin_id,
  adminName: row.admin_name,
  action: row.action,
  section: row.section,
  item: row.item,
  createdAt: row.created_at,
});

export async function addActivity({ adminId, adminName, action, section, item }) {
  await query('INSERT INTO admin_activity (admin_id, admin_name, action, section, item) VALUES (?, ?, ?, ?, ?)', [
    adminId,
    adminName,
    action,
    section,
    item ? String(item).slice(0, 200) : null,
  ]);
}

/** Latest entries. Returns null when the table does not exist yet (migration not run). */
export async function listActivity(limit = 200) {
  try {
    const rows = await query('SELECT * FROM admin_activity ORDER BY created_at DESC, id DESC LIMIT ?', [limit]);
    return rows.map(toEntity);
  } catch (error) {
    if (error.code === 'ER_NO_SUCH_TABLE') return null;
    throw error;
  }
}

/** Keeps the log small: removes entries older than `days`. */
export async function pruneActivity(days = 365) {
  await query('DELETE FROM admin_activity WHERE created_at < (NOW() - INTERVAL ? DAY)', [days]).catch(() => {});
}
