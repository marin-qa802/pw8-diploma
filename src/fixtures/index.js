import { test as base } from '@playwright/test';
import { App } from '../facade/App.js';
import { ApiClient } from '../api/ApiClient.js';

export const test = base.extend({
  app: async ({ page, request }, use) => {
    await use(new App(page, new ApiClient(request)));
  },
});
