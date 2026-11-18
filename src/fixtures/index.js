import { test as base } from '@playwright/test';
import { App } from '../facade/App'; // Проверь путь, если папка src в корне, то '../facade/App' верно

export const test = base.extend({
  app: async ({ page, request }, use) => {
    // Передаем page и request в фасад (так как в App.js конструктор ждет два аргумента)
    await use(new App(page, request)); 
  },
});

export { expect } from '@playwright/test';