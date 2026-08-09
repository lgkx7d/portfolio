import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop 1440x900',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'Desktop 1280x800',
      use: { viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'Tablet 1024x768',
      use: { viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'Tablet 768x1024',
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'Mobile 430x932',
      use: { viewport: { width: 430, height: 932 }, hasTouch: true },
    },
    {
      name: 'Mobile 390x844',
      use: { viewport: { width: 390, height: 844 }, hasTouch: true },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
