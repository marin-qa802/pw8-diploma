import { test as base } from '@playwright/test';
import { AppApi } from '../services/api';
import { VikunjaMainPage } from '../pages/VikunjaMainPage';

export const test = base.extend({
  // API фасад
  api: async ({ request }, use) => {
    await use(new AppApi(request));
  },
  
  // UI фасад
  mainPage: async ({ page }, use) => {
    await use(new VikunjaMainPage(page));
  },
});

export { expect } from '@playwright/test';