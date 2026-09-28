import 'server-only';
import { query } from '@/lib/db';
import { CONTENT_DEFAULTS, OPTIONAL_CONTENT_KEYS } from '@/lib/content-config';

// Defaults keep the site rendering even if a key was never seeded.
// Page text/images come from content-config.js; contact details are below.
export const SETTING_DEFAULTS = {
  ...CONTENT_DEFAULTS,
  'contact.telephone': '+971 7 226 3131',
  'contact.mobile': '+971 55 2070846',
  'contact.email': 'baniyasbuilders@gmail.com',
  'contact.address': 'Post Box No.9962, Unit No:301,\nEmirates Islamic Tower,\nAl Nakheel, RAK-UAE',
  'contact.map_url':
    'https://www.google.com/maps/place/BANI+YAS+BUILDING+CONTRACTING+LLC/@25.7927303,55.9702808,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef677ca5a3df437:0xcd1b24b01aa0fca1!8m2!3d25.7927303!4d55.9702808!16s%2Fg%2F11v5xyzmj3?entry=ttu&g_ep=EgoyMDI1MDcwNi4wIKXMDSoASAFQAw%3D%3D',
  'contact.map_embed_url':
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.32862595678!2d55.9702808!3d25.792730300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef677ca5a3df437%3A0xcd1b24b01aa0fca1!2sBANI%20YAS%20BUILDING%20CONTRACTING%20LLC!5e0!3m2!1sen!2sin!4v1752064482698!5m2!1sen!2sin',
  'social.facebook': 'https://facebook.com/',
  'social.x': 'https://x.com/',
  'social.behance': 'https://behance.net/',
  'social.linkedin': 'https://linkedin.com/',
  'contact.whatsapp': '',
};

// Keys the admin may clear on purpose (an empty value hides the item on the site).
const CLEARABLE_KEYS = new Set([
  'contact.mobile',
  'contact.whatsapp',
  'social.facebook',
  'social.x',
  'social.behance',
  'social.linkedin',
  ...OPTIONAL_CONTENT_KEYS,
]);

export async function getSettings() {
  const rows = await query('SELECT setting_key, setting_value FROM site_settings');
  const settings = { ...SETTING_DEFAULTS };
  for (const row of rows) {
    const value = row.setting_value;
    if (value !== null && (value !== '' || CLEARABLE_KEYS.has(row.setting_key))) settings[row.setting_key] = value;
  }
  return settings;
}

export async function saveSettings(values) {
  const entries = Object.entries(values);
  if (!entries.length) return;
  await query(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES ${entries.map(() => '(?, ?)').join(', ')}
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    entries.flat()
  );
}
