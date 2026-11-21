import { LoginPage } from '../pages/LoginPage.js';
import { ProjectsPage } from '../pages/ProjectsPage.js';
import { getCreds } from '../config/creds.js';

const tokenCache = { value: null };

export class App {
  constructor(page, api) {
    this.page = page;
    this.api = api;
    this.login = new LoginPage(page);
    this.projects = new ProjectsPage(page);
  }

  async as(page) {
    const { username, password } = getCreds();
    await this.fetchTokenWithRetry(username, password);

    const token = tokenCache.value;

    await this.page.goto('/');
    await this.page.evaluate((t) => localStorage.setItem('token', t), token);
    await this.page.reload();

    // ждём, пока приложение инициализируется с токеном
    const loading = this.page.locator('.vikunja-loading');
    await loading.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

      async fetchTokenWithRetry(username, password) {
    if (tokenCache.value) return; // токен уже получен — не бьём по логину повторно

    const delays = [0, 5000, 15000, 30000, 60000]; // нарастающие паузы, мс
    for (const delay of delays) {
      if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
      const resp = await this.page.request.post('/api/v1/login', {
        data: { username, password },
      });
      if (resp.ok()) {
        tokenCache.value = (await resp.json()).token;
        return;
      }
      if (resp.status() !== 429) {
        throw new Error(`Не удалось получить токен: ${resp.status()} ${await resp.text()}`);
      }
      // 429 — молчим и ждём следующей попытки
    }
    throw new Error('Не удалось получить токен: сервер стабильно отвечает 429');
    }
  
  }
