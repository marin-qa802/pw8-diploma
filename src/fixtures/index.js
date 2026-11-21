import { test as base, expect } from '@playwright/test';
import { App } from '../facade/App.js';
import { AppApi } from '../services/api.js';

export const test = base.extend({
  app: async ({ page }, use) => {
    await use(new App(page));
  },

  api: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://try.vikunja.io',
      extraHTTPHeaders: process.env.VIKUNJA_TOKEN
        ? { Authorization: `Bearer ${process.env.VIKUNJA_TOKEN}` }
        : {},
    });

    const apiService = new AppApi(request);
    if (!process.env.VIKUNJA_TOKEN) {
      await apiService.login({
        username: process.env.VIKUNJA_USER,
        password: process.env.VIKUNJA_PASSWORD,
      });
    }

    await use(apiService);
    await request.dispose();
  },
});

export { expect };
