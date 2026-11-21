import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Явно указываем путь к .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  globalTimeout: 3_600_000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: process.env.CI ? 90_000 : 60_000,

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

      use: {
    baseURL: process.env.BASE_URL || 'https://try.vikunja.io',
    locale: 'ru-RU',
    screenshot: 'on',
    trace: 'on-first-retry',
    storageState: 'playwright/.auth/user.json',
  },

    projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
      use: {
        // setup стартует без сессии — файл состояния ещё не создан
        storageState: { cookies: [], origins: [] },
      },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
