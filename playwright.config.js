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
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }], 
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    // Берем URL из .env
    baseURL: process.env.BASE_URL || 'https://try.vikunja.io',
    // Добавляем авторизацию для API Vikunja
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.VIKUNJA_TOKEN}`,
      'Content-Type': 'application/json',
    },
    screenshot: 'on',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});