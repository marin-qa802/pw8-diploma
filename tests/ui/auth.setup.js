import { test } from '../../src/fixtures/index.js';

test('authenticate', async ({ app }) => {
  await app.login.open();
  await app.login.login({
    email: process.env.VIKUNJA_USER,
    password: process.env.VIKUNJA_PASSWORD,
  });

  // Vikunja кладёт JWT в localStorage под ключом "token" — ждём именно его
  await app.login.page.waitForFunction(
    () => Boolean(window.localStorage.getItem('token')),
    null,
    { timeout: 15000 },
  );

  await app.login.page.context()
    .storageState({ path: 'playwright/.auth/user.json' });
});
