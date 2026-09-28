import 'server-only';
import { query } from '@/lib/db';

// Defaults keep the site rendering even if a key was never seeded.
export const SETTING_DEFAULTS = {
  'home.trusted_clients_title': 'Our Trusted Clients',
  'home.services_subtitle': 'Our Services',
  'home.services_title': 'Our end to end offerings',
  'home.services_image': '/assets/img/page/services.jpg',
  'about.clients_subtitle': 'Our Partners',
  'about.clients_title': 'Our Clients',
};

export async function getSettings() {
  const rows = await query('SELECT setting_key, setting_value FROM site_settings');
  const settings = { ...SETTING_DEFAULTS };
  for (const row of rows) {
    if (row.setting_value !== null && row.setting_value !== '') settings[row.setting_key] = row.setting_value;
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
