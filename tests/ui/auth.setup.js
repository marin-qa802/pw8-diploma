import { test as setup } from '../../src/fixtures/index.js';
import { ensureUser, getCreds } from '../../src/config/creds.js';

setup('authenticate', async ({ app }) => {
  // 1) гарантируем живого пользователя
  await ensureUser(process.env.BASE_URL);
  const { username, password } = getCreds();

  // 2) логинимся через API — надёжнее формы, и без риска словить 429 на UI-клике
  const resp = await app.page.request.post('/api/v1/login', {
    data: { username, password },
  });
  if (!resp.ok()) {
    throw new Error(`Login failed: ${resp.status()} ${await resp.text()}`);
  }
  const { token } = await resp.json();

  // 3) кладём токен в localStorage и сохраняем storageState
  await app.page.goto('/');
  await app.page.evaluate((t) => localStorage.setItem('token', t), token);

  await app.page.context().storageState({ path: 'playwright/.auth/user.json' });
});
