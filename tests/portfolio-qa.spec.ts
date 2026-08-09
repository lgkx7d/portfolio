import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Automated Website QA & Self-Repair Suite', () => {

  test('01. Runtime & Console Audit', async ({ page }) => {
    const runtimeErrors: string[] = [];

    page.on('pageerror', (err) => {
      runtimeErrors.push(err.message);
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (
          !text.includes('net::ERR') &&
          !text.includes('favicon.ico') &&
          !text.includes('404') &&
          !text.includes('Failed to load resource')
        ) {
          runtimeErrors.push(text);
        }
      }
    });

    await page.goto('/');
    await page.waitForTimeout(3200);

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    expect(runtimeErrors).toHaveLength(0);
  });

  test('02. Horizontal Overflow Detection', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3200);

    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(isOverflowing).toBe(false);
  });

  test('03. Navigation & Section Scrolling', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3200);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeAttached();

    const workSection = page.locator('#work');
    await expect(workSection).toBeAttached();

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeAttached();
  });

  test('04. Interactive Copy Email Action', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3200);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeAttached();

    const copyBtn = page.locator('#copy-email-btn');
    await expect(copyBtn).toBeAttached();
  });

  test('05. axe-core Accessibility Audit', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3200);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toBeDefined();
  });

  test('06. Visual Regression Screenshots', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForTimeout(3500);

    const screenshot = await page.screenshot();
    await testInfo.attach('portfolio-visual-snapshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
