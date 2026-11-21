import { LoginPage } from '../pages/LoginPage.js';
import { ProjectsPage } from '../pages/ProjectsPage.js';

export class App {
  constructor(page, api) {
    this.page = page;
    this.api = api;
    this.login = new LoginPage(page);
    this.projects = new ProjectsPage(page);
  }

  async as(user) {
    await this.page.goto('/');

    // свежий токен берём напрямую у API — минуя форму логина
    const resp = await this.page.request.post('/api/v1/login', {
      data: {
        username: user.email,
        password: user.password,
      },
    });
    if (!resp.ok()) {
      throw new Error(`Не удалось получить токен: ${resp.status()} ${await resp.text()}`);
    }
    const { token } = await resp.json();

    await this.page.evaluate((t) => localStorage.setItem('token', t), token);
    await this.page.reload();

    // ждём, пока приложение инициализируется с токеном
    const loading = this.page.locator('.vikunja-loading');
    await loading.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }
}
