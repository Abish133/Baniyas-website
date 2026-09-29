// Seeds the database with the original website content and the first admin user.
// Idempotent: tables that already contain rows are left untouched.
// Usage: npm run db:seed
import bcrypt from 'bcryptjs';
import { connect, isPublicExamplePassword } from './_db.mjs';
import * as data from '../database/seed-data.mjs';

async function isEmpty(conn, table) {
  const [[row]] = await conn.query(`SELECT COUNT(*) AS total FROM \`${table}\``);
  return Number(row.total) === 0;
}

async function seedTable(conn, table, rows, toRecord) {
  if (!(await isEmpty(conn, table))) {
    console.log(`• ${table}: already has data, skipped`);
    return;
  }
  for (const [index, row] of rows.entries()) {
    const record = { ...toRecord(row), sort_order: index + 1 };
    const cols = Object.keys(record);
    await conn.query(
      `INSERT INTO \`${table}\` (${cols.map((c) => `\`${c}\``).join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`,
      Object.values(record)
    );
  }
  console.log(`✔ ${table}: ${rows.length} row(s)`);
}

async function main() {
  const conn = await connect();
  try {
    // Settings (insert missing keys only)
    for (const [key, value] of Object.entries(data.settings)) {
      await conn.query('INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)', [key, value]);
    }
    console.log('✔ site_settings');

    await seedTable(conn, 'trusted_clients', data.trustedClients, (r) => ({ name: r.name, logo: r.logo }));
    await seedTable(conn, 'home_stats', data.homeStats, (r) => ({ label: r.label, value: r.value, suffix: r.suffix }));
    await seedTable(conn, 'home_projects', data.homeProjects, (r) => ({ title: r.title, location: r.location, image: r.image }));
    await seedTable(conn, 'portfolio_projects', data.portfolioProjects, (r) => ({ caption: r.caption, image: r.image }));
    await seedTable(conn, 'clients', data.clients, (name) => ({ name }));
    await seedTable(conn, 'job_openings', data.jobOpenings, (r) => ({
      title: r.title, job_type: r.jobType, location: r.location, experience: r.experience, requirements: r.requirements,
    }));

    if (await isEmpty(conn, 'services')) {
      for (const s of data.services) {
        const [result] = await conn.query(
          `INSERT INTO services (slug, card_title, title, icon, image, description1, description2, subtitle, main_content,
             detail_image1, detail_image2, final_description, show_on_home, show_on_page, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.slug, s.cardTitle, s.title, s.icon, s.image, s.description1, s.description2, s.subtitle, s.mainContent,
            s.detailImage1, s.detailImage2, s.finalDescription, s.showOnHome ? 1 : 0, s.showOnPage ? 1 : 0, s.sortOrder]
        );
        for (const [i, content] of s.benefits.entries()) {
          await conn.query('INSERT INTO service_benefits (service_id, content, sort_order) VALUES (?, ?, ?)', [result.insertId, content, i + 1]);
        }
        for (const [i, faq] of s.faqs.entries()) {
          await conn.query('INSERT INTO service_faqs (service_id, question, answer, sort_order) VALUES (?, ?, ?, ?)', [result.insertId, faq.question, faq.answer, i + 1]);
        }
      }
      console.log(`✔ services: ${data.services.length} row(s)`);
    } else {
      console.log('• services: already has data, skipped');
    }

    // First admin
    const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD || '';
    if (isPublicExamplePassword(password)) {
      console.warn('! ADMIN_PASSWORD is the old published example — no admin created. Set your own password in .env.');
    } else if (email && password) {
      const [existing] = await conn.query('SELECT id FROM admin_users WHERE email = ?', [email]);
      if (existing.length) {
        console.log(`• admin_users: ${email} already exists, skipped`);
      } else {
        const hash = await bcrypt.hash(password, 12);
        await conn.query('INSERT INTO admin_users (name, email, password_hash) VALUES (?, ?, ?)', [process.env.ADMIN_NAME || 'Administrator', email, hash]);
        console.log(`✔ admin_users: created ${email}`);
      }
    } else {
      console.warn('! ADMIN_EMAIL / ADMIN_PASSWORD not set — no admin user created (use npm run admin:create).');
    }
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error('✖ Seeding failed:', err.message);
  process.exit(1);
});
