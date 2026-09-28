import 'server-only';
import { query, queryOne, transaction } from '@/lib/db';

const COLUMNS = {
  slug: 'slug',
  cardTitle: 'card_title',
  title: 'title',
  icon: 'icon',
  image: 'image',
  description1: 'description1',
  description2: 'description2',
  subtitle: 'subtitle',
  mainContent: 'main_content',
  detailImage1: 'detail_image1',
  detailImage2: 'detail_image2',
  finalDescription: 'final_description',
  showOnHome: 'show_on_home',
  showOnPage: 'show_on_page',
  isActive: 'is_active',
  sortOrder: 'sort_order',
};
const BOOLEAN_KEYS = ['showOnHome', 'showOnPage', 'isActive'];

function toEntity(row) {
  if (!row) return null;
  const entity = { id: row.id, updatedAt: row.updated_at };
  for (const [key, column] of Object.entries(COLUMNS)) entity[key] = row[column];
  for (const key of BOOLEAN_KEYS) entity[key] = Boolean(entity[key]);
  return entity;
}

async function attachChildren(services) {
  if (!services.length) return services;
  const ids = services.map((s) => s.id);
  const [benefits, faqs] = await Promise.all([
    query('SELECT service_id, content FROM service_benefits WHERE service_id IN (?) ORDER BY sort_order, id', [ids]),
    query('SELECT service_id, question, answer FROM service_faqs WHERE service_id IN (?) ORDER BY sort_order, id', [ids]),
  ]);
  for (const service of services) {
    service.benefits = benefits.filter((b) => b.service_id === service.id).map((b) => b.content);
    service.faqs = faqs.filter((f) => f.service_id === service.id).map(({ question, answer }) => ({ question, answer }));
  }
  return services;
}

/** Cards for the home page slider. */
export async function listForHome() {
  return (await query(
    'SELECT * FROM services WHERE is_active = 1 AND show_on_home = 1 ORDER BY sort_order, id'
  )).map(toEntity);
}

/** Full services (with benefits + FAQs) for the services page. */
export async function listForPage() {
  const services = (await query(
    'SELECT * FROM services WHERE is_active = 1 AND show_on_page = 1 ORDER BY sort_order, id'
  )).map(toEntity);
  return attachChildren(services);
}

export async function listAll() {
  return (await query('SELECT * FROM services ORDER BY sort_order, id')).map(toEntity);
}

export async function findById(id) {
  const service = toEntity(await queryOne('SELECT * FROM services WHERE id = ?', [id]));
  if (!service) return null;
  const [withChildren] = await attachChildren([service]);
  return withChildren;
}

export async function slugExists(slug, excludeId = 0) {
  return Boolean(await queryOne('SELECT id FROM services WHERE slug = ? AND id <> ?', [slug, excludeId]));
}

export async function nextSortOrder() {
  const row = await queryOne('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM services');
  return Number(row.next);
}

export async function count() {
  const row = await queryOne('SELECT COUNT(*) AS total FROM services');
  return Number(row.total);
}

function toColumns(data) {
  const columns = {};
  for (const [key, column] of Object.entries(COLUMNS)) {
    if (data[key] === undefined) continue;
    columns[column] = BOOLEAN_KEYS.includes(key) ? Number(Boolean(data[key])) : data[key];
  }
  return columns;
}

async function replaceChildren(conn, serviceId, { benefits, faqs }) {
  await conn.query('DELETE FROM service_benefits WHERE service_id = ?', [serviceId]);
  await conn.query('DELETE FROM service_faqs WHERE service_id = ?', [serviceId]);
  for (const [index, content] of (benefits || []).entries()) {
    await conn.query('INSERT INTO service_benefits (service_id, content, sort_order) VALUES (?, ?, ?)', [serviceId, content, index + 1]);
  }
  for (const [index, faq] of (faqs || []).entries()) {
    await conn.query('INSERT INTO service_faqs (service_id, question, answer, sort_order) VALUES (?, ?, ?, ?)', [serviceId, faq.question, faq.answer, index + 1]);
  }
}

export async function create(data) {
  return transaction(async (conn) => {
    const columns = toColumns(data);
    const names = Object.keys(columns);
    const [result] = await conn.query(
      `INSERT INTO services (${names.map((c) => `\`${c}\``).join(', ')}) VALUES (${names.map(() => '?').join(', ')})`,
      Object.values(columns)
    );
    await replaceChildren(conn, result.insertId, data);
    return result.insertId;
  });
}

export async function update(id, data) {
  await transaction(async (conn) => {
    const columns = toColumns(data);
    const names = Object.keys(columns);
    await conn.query(
      `UPDATE services SET ${names.map((c) => `\`${c}\` = ?`).join(', ')} WHERE id = ?`,
      [...Object.values(columns), id]
    );
    await replaceChildren(conn, id, data);
  });
}

export async function updateFlags(id, data) {
  const columns = toColumns(data);
  const names = Object.keys(columns);
  if (!names.length) return;
  await query(`UPDATE services SET ${names.map((c) => `\`${c}\` = ?`).join(', ')} WHERE id = ?`, [...Object.values(columns), id]);
}

export async function remove(id) {
  await query('DELETE FROM services WHERE id = ?', [id]);
}
