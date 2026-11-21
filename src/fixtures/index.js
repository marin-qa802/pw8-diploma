import { test as base, expect } from '@playwright/test';
import { App } from '../facade/App.js';
import { AppApi } from '../services/api.js';
import { getCreds } from '../config/creds.js';

export const test = base.extend({
  app: async ({ page }, use) => {
    await use(new App(page));
  },

  api: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://try.vikunja.io',
    });

    const apiService = new AppApi(request);

    // креды берём из creds.js — setup уже создал живого пользователя
    const { username, password } = getCreds();
    await apiService.login({ username, password });

    await use(apiService);
    await request.dispose();
  },
});

export { expect };

