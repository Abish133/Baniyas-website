import { test, expect } from '@playwright/test';
import { ADMIN_BASE } from '../../src/lib/admin-path.js';

// Collects browser console errors and uncaught exceptions (this also catches
// Content-Security-Policy violations, which the browser reports as console errors).
function watchErrors(page) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

const PAGES = [
  { path: '/', text: /Our Trusted Clients|FAQs/ },
  { path: '/about', text: /About Us/ },
  { path: '/services', text: /Our Solutions/ },
  { path: '/portfolio', text: /Portfolio/ },
  { path: '/careers', text: /Careers/ },
  { path: '/contact', text: /Get In Touch/ },
];

test.describe('Public pages', () => {
  for (const { path, text } of PAGES) {
    test(`${path} loads without errors`, async ({ page }) => {
      const errors = watchErrors(page);
      const response = await page.goto(path, { waitUntil: 'networkidle' });
      expect(response.status()).toBe(200);
      await expect(page.locator('body')).toContainText(text);
      // Contact details come from the admin panel: the footer/sidebar must show a phone link.
      expect(await page.locator('a[href^="tel:"]').count()).toBeGreaterThan(0);
      expect(errors).toEqual([]);
    });
  }

  test('unknown URLs show the themed 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response.status()).toBe(404);
    await expect(page.locator('body')).toContainText('Oops! Page not found.');
  });

  test('a service link from the home page opens that service', async ({ page }) => {
    await page.goto('/services');
    const second = page.locator('.service-link').nth(1);
    const title = (await second.textContent()).trim();
    const href = await second.getAttribute('href');
    await page.goto(`/services${href}`);
    await expect(page.locator('.service-link.active')).toHaveText(title);
    await expect(page.locator('#service-content h3').first()).toHaveText(title);
  });

  test('the banner video and logo are the optimised files', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('#myVideo')).toHaveAttribute('poster', /\.(jpg|webp)$/);
    const video = await request.get(await page.locator('#myVideo source').getAttribute('src'), { headers: { Range: 'bytes=0-99' } });
    expect([200, 206]).toContain(video.status());
    // The first logo in the page is inside the (closed) sidebar menu, so look for a visible one.
    const logo = page.locator('img[src="/assets/img/logo.webp"]').filter({ visible: true }).first();
    await expect(logo).toBeVisible();
    expect(await logo.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
  });
});

test.describe('SEO and technical endpoints', () => {
  test('sitemap, robots and health respond', async ({ request }) => {
    expect((await request.get('/sitemap.xml')).status()).toBe(200);
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Sitemap:');
    expect(robots).not.toContain(ADMIN_BASE); // the admin URL must stay hidden
    const health = await request.get('/api/health');
    expect(health.status()).toBe(200);
    expect(await health.json()).toMatchObject({ status: 'ok' });
  });

  test('pages send security headers and a page description', async ({ request, page }) => {
    const response = await request.get('/');
    expect(response.headers()['content-security-policy']).toContain("default-src 'self'");
    expect(response.headers()['x-frame-options']).toBe('SAMEORIGIN');
    await page.goto('/about');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
  });
});

test.describe('Admin panel', () => {
  test('the old /admin URL does not exist', async ({ request }) => {
    expect((await request.get('/admin')).status()).toBe(404);
  });

  test('admin pages require signing in', async ({ page }) => {
    await page.goto(`${ADMIN_BASE}/content/home`);
    await expect(page).toHaveURL(new RegExp(`${ADMIN_BASE}/login`));
  });

  test('the login page works and rejects a wrong password', async ({ page }) => {
    const errors = watchErrors(page);
    // Wait until the form's JavaScript is ready, as a person would before typing.
    await page.goto(`${ADMIN_BASE}/login`, { waitUntil: 'networkidle' });
    await page.locator('input[name="email"]').fill(`e2e-${Date.now()}@example.com`);
    await page.locator('input[name="password"]').fill('wrong-password-123');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('body')).toContainText('Invalid email or password');
    expect(errors).toEqual([]);
  });
});
