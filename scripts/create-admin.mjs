// Creates (or resets the password of) an admin user.
// Usage: npm run admin:create                      -> uses ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD from .env
//        npm run admin:create -- email@x.com Secret@123 "Full Name"
import bcrypt from 'bcryptjs';
import { connect } from './_db.mjs';

const [argEmail, argPassword, argName] = process.argv.slice(2);
const email = (argEmail || process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = argPassword || process.env.ADMIN_PASSWORD || '';
const name = argName || process.env.ADMIN_NAME || 'Administrator';

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('✖ Provide a valid admin email (ADMIN_EMAIL or first argument).');
  process.exit(1);
}
if (password.length < 8) {
  console.error('✖ Admin password must be at least 8 characters.');
  process.exit(1);
}

const conn = await connect();
try {
  const hash = await bcrypt.hash(password, 12);
  await conn.query(
    `INSERT INTO admin_users (name, email, password_hash) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash)`,
    [name, email, hash]
  );
  console.log(`✔ Admin user ready: ${email}`);
} finally {
  await conn.end();
}
