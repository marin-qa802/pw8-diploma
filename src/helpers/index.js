import { test as base } from '@playwright/test';
import { AppApi } from '../services/api'; // путь к твоему файлу api.js

export const test = base.extend({
  api: async ({ request }, use) => {
    await use(new AppApi(request));
  },
});

export { expect } from '@playwright/test';