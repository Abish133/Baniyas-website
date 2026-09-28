import 'server-only';
import { query, queryOne } from '@/lib/db';

/**
 * Small repository factory for the simple "sortable list" tables.
 * `fields` maps camelCase keys used in the app to snake_case DB columns.
 * Every table is expected to have: id, is_active, sort_order, created_at, updated_at.
 */
export function createCrudRepository({ table, fields }) {
  const allFields = { ...fields, isActive: 'is_active', sortOrder: 'sort_order' };
  const selectList = ['id', ...Object.values(allFields), 'created_at', 'updated_at'].map((c) => `\`${c}\``).join(', ');
  const orderBy = 'sort_order ASC, id ASC';

  const toEntity = (row) => {
    if (!row) return null;
    const entity = { id: row.id, createdAt: row.created_at, updatedAt: row.updated_at };
    for (const [key, column] of Object.entries(allFields)) entity[key] = row[column];
    entity.isActive = Boolean(row.is_active);
    return entity;
  };

  const toColumns = (data) => {
    const columns = {};
    for (const [key, column] of Object.entries(allFields)) {
      if (data[key] === undefined) continue;
      columns[column] = typeof data[key] === 'boolean' ? Number(data[key]) : data[key];
    }
    return columns;
  };

  return {
    async listAll() {
      return (await query(`SELECT ${selectList} FROM \`${table}\` ORDER BY ${orderBy}`)).map(toEntity);
    },
    async listActive() {
      return (await query(`SELECT ${selectList} FROM \`${table}\` WHERE is_active = 1 ORDER BY ${orderBy}`)).map(toEntity);
    },
    async findById(id) {
      return toEntity(await queryOne(`SELECT ${selectList} FROM \`${table}\` WHERE id = ?`, [id]));
    },
    async countActive({ excludeId } = {}) {
      const row = excludeId
        ? await queryOne(`SELECT COUNT(*) AS total FROM \`${table}\` WHERE is_active = 1 AND id <> ?`, [excludeId])
        : await queryOne(`SELECT COUNT(*) AS total FROM \`${table}\` WHERE is_active = 1`);
      return Number(row.total);
    },
    async count() {
      const row = await queryOne(`SELECT COUNT(*) AS total FROM \`${table}\``);
      return Number(row.total);
    },
    async nextSortOrder() {
      const row = await queryOne(`SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM \`${table}\``);
      return Number(row.next);
    },
    async create(data) {
      const columns = toColumns(data);
      const names = Object.keys(columns);
      const result = await query(
        `INSERT INTO \`${table}\` (${names.map((c) => `\`${c}\``).join(', ')}) VALUES (${names.map(() => '?').join(', ')})`,
        Object.values(columns)
      );
      return result.insertId;
    },
    async update(id, data) {
      const columns = toColumns(data);
      const names = Object.keys(columns);
      if (!names.length) return;
      await query(
        `UPDATE \`${table}\` SET ${names.map((c) => `\`${c}\` = ?`).join(', ')} WHERE id = ?`,
        [...Object.values(columns), id]
      );
    },
    async remove(id) {
      await query(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
    },
  };
}
