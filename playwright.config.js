// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { URL_UI } from './src/config/index.js'; // Импортируем твой URL
import 'dotenv/config'; // Подгружаем переменные окружения из .env

export default defineConfig({
  globalTimeout: 3_600_000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Репортер строго один раз и на уровне всего конфига
  reporter: [['html', { open: 'never' }], ['allure-playwright']],

  use: {
    // Используем URL_UI, который мы импортировали
    baseURL: URL_UI || 'https://try.vikunja.io', 
    screenshot: 'on',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // БОЛЬШЕ НИКАКИХ reporter ВНУТРИ PROJECTS!
  ],
});