import { describe, expect, it } from 'vitest';
import { contactSettingsSchema, adminUserSchema, contactSchema } from '@/lib/validation/schemas';
import { SETTING_DEFAULTS } from '@/lib/repositories/settings';

const contactDefaults = () => Object.fromEntries(Object.keys(contactSettingsSchema.shape).map((key) => [key, SETTING_DEFAULTS[key]]));

describe('Contact Details validation', () => {
  it('accepts the original contact details', () => {
    const result = contactSettingsSchema.safeParse(contactDefaults());
    expect(result.success ? {} : result.error.issues).toEqual({});
  });

  it('extracts the link from a pasted Google Maps <iframe> code', () => {
    const src = 'https://www.google.com/maps/embed?pb=!1m18!abc';
    const result = contactSettingsSchema.safeParse({ ...contactDefaults(), 'contact.map_embed_url': `<iframe src="${src}" width="600"></iframe>` });
    expect(result.success).toBe(true);
    expect(result.data['contact.map_embed_url']).toBe(src);
  });

  it('rejects a map embed from another site and non-https social links', () => {
    expect(contactSettingsSchema.safeParse({ ...contactDefaults(), 'contact.map_embed_url': 'https://evil.example/embed' }).success).toBe(false);
    expect(contactSettingsSchema.safeParse({ ...contactDefaults(), 'social.facebook': 'javascript:alert(1)' }).success).toBe(false);
  });

  it('allows clearing optional items (hides them on the site)', () => {
    const result = contactSettingsSchema.safeParse({ ...contactDefaults(), 'contact.mobile': '', 'contact.whatsapp': '', 'social.x': '' });
    expect(result.success).toBe(true);
    expect(result.data['contact.mobile']).toBe('');
  });

  it('requires the country code for WhatsApp', () => {
    expect(contactSettingsSchema.safeParse({ ...contactDefaults(), 'contact.whatsapp': '055 2070846' }).success).toBe(false);
    expect(contactSettingsSchema.safeParse({ ...contactDefaults(), 'contact.whatsapp': '+971 55 2070846' }).success).toBe(true);
  });
});

describe('Admin user validation', () => {
  const base = { name: 'Jane Admin', email: 'Jane@Example.com' };

  it('requires a strong password when creating', () => {
    expect(adminUserSchema({ creating: true }).safeParse({ ...base, password: '' }).success).toBe(false);
    expect(adminUserSchema({ creating: true }).safeParse({ ...base, password: 'onlyletters' }).success).toBe(false);
    const ok = adminUserSchema({ creating: true }).safeParse({ ...base, password: 'Secret123' });
    expect(ok.success).toBe(true);
    expect(ok.data.email).toBe('jane@example.com');
  });

  it('keeps the password when editing with an empty field', () => {
    const result = adminUserSchema({ creating: false }).safeParse({ ...base, password: '' });
    expect(result.success).toBe(true);
    expect(result.data.password).toBeNull();
  });
});

describe('Contact form validation', () => {
  it('accepts a normal enquiry and strips unknown fields (honeypot etc.)', () => {
    const result = contactSchema.safeParse({ name: 'Ali', email: 'ali@example.com', phone: '+971 50 123 4567', message: 'Hello there', website: 'x' });
    expect(result.success).toBe(true);
    expect(result.data).not.toHaveProperty('website');
  });

  it('rejects an invalid email', () => {
    expect(contactSchema.safeParse({ name: 'Ali', email: 'nope' }).success).toBe(false);
  });
});
