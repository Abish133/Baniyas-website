import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { csvCell, toCsv } from '@/lib/admin/csv';
import { createLimiter, clientIp, isLoginLimited, registerFailedLogin, clearFailedLogins } from '@/lib/auth/rate-limit';
import { ADMIN_BASE } from '@/lib/admin-path';
import { LOGIN_PATH, ADMIN_HOME } from '@/lib/auth/constants';

const headers = (values) => new Headers(values);

describe('CSV export', () => {
  it('quotes cells and escapes quotes', () => {
    expect(csvCell('Say "hi"')).toBe('"Say ""hi"""');
    expect(csvCell(null)).toBe('""');
  });

  it('neutralises spreadsheet formulas', () => {
    for (const evil of ['=HYPERLINK("x")', '+1+1', '-2', '@SUM(A1)']) expect(csvCell(evil).startsWith(`"'`)).toBe(true);
  });

  it('starts with a UTF-8 BOM and uses CRLF line endings', () => {
    const csv = toCsv([['a', 'b'], ['c', 'd']]);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(csv).toContain('"a","b"\r\n"c","d"');
  });
});

describe('Rate limiting', () => {
  it('blocks after the allowed number of hits and can be reset', () => {
    const limiter = createLimiter(`test-${Math.random()}`, { windowMs: 60_000, max: 3 });
    for (let i = 0; i < 3; i++) limiter.hit('k');
    expect(limiter.isLimited('k')).toBe(true);
    expect(limiter.isLimited('other')).toBe(false);
    limiter.reset('k');
    expect(limiter.isLimited('k')).toBe(false);
  });

  it('forgets hits after the time window', () => {
    const limiter = createLimiter(`test-${Math.random()}`, { windowMs: -1, max: 1 });
    limiter.hit('k');
    expect(limiter.isLimited('k')).toBe(false);
  });

  it('login is locked per email even when the attacker changes IP address', () => {
    const email = `victim-${Math.random()}@example.com`;
    for (let i = 0; i < 20; i++) registerFailedLogin(`10.0.0.${i}`, email);
    expect(isLoginLimited('10.9.9.9', email)).toBe(true);
    clearFailedLogins('10.9.9.9', email);
  });

  it('uses the proxy-added (last) x-forwarded-for entry, not the forgeable first one', () => {
    expect(clientIp(headers({ 'x-forwarded-for': '1.1.1.1, 203.0.113.7' }))).toBe('203.0.113.7');
    expect(clientIp(headers({ 'x-real-ip': '198.51.100.2' }))).toBe('198.51.100.2');
    expect(clientIp(headers({}))).toBe('unknown');
  });
});

describe('Hidden admin URL', () => {
  const root = path.resolve(__dirname, '../..');

  it('matches the route folder name', () => {
    expect(fs.existsSync(path.join(root, 'src', 'app', '(admin)', ADMIN_BASE.slice(1)))).toBe(true);
  });

  it('is protected by the proxy matcher', () => {
    const proxy = fs.readFileSync(path.join(root, 'src', 'proxy.js'), 'utf8');
    expect(proxy).toContain(`'${ADMIN_BASE}'`);
    expect(proxy).toContain(`'${ADMIN_BASE}/:path*'`);
  });

  it('login and home paths are inside it', () => {
    expect(LOGIN_PATH).toBe(`${ADMIN_BASE}/login`);
    expect(ADMIN_HOME).toBe(ADMIN_BASE);
  });
});
