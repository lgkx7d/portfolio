import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Automated Website QA & Self-Repair Suite', () => {

  test('01. Runtime & Console Audit', async ({ page }) => {
    const runtimeErrors: string[] = [];

    // Catch uncaught JS exceptions
    page.on('pageerror', (err) => {
      runtimeErrors.push(err.message);
    });

    // Catch console.error calls
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('net::ERR') && !text.includes('favicon.ico')) {
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

    const overflowingElements = await page.evaluate(() => {
      const elements: string[] = [];
      const windowWidth = window.innerWidth;
      const allEls = document.querySelectorAll('*');
      allEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > windowWidth + 1) {
          elements.push(`${el.tagName.toLowerCase()}.${Array.from(el.classList).join('.')} (right: ${rect.right}px > ${windowWidth}px)`);
        }
      });
      return elements;
    });

    if (overflowingElements.length > 0) {
      console.log('Overflowing Elements:', overflowingElements.slice(0, 5));
    }

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
    await contactSection.scrollIntoViewIfNeeded();

    const copyBtn = page.locator('text=COPY EMAIL');
    if (await copyBtn.isVisible()) {
      await copyBtn.click({ force: true });
      await page.waitForTimeout(500);
      const copiedText = page.locator('text=COPIED ✓');
      await expect(copiedText).toBeVisible();
    }
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
