import { test, expect } from '../../src/fixtures/index.js';
import { ProjectBuilder, TaskBuilder } from '../../src/builders/task.builder.js';

const testUser = {
  email: process.env.VIKUNJA_USER,
  password: process.env.VIKUNJA_PASSWORD,
};

// очищает сессию, чтобы снова увидеть форму логина
async function clearAuthState(app) {
  await app.page.goto('/');
  await app.page.context().clearCookies();
  await app.page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
}

test.describe('Vikunja UI: Функциональные сценарии', () => {

  test('Успешная авторизация пользователя', async ({ app }) => {
    await clearAuthState(app);

    await app.login.open();
    await app.login.login(testUser);

    // ждём токен в localStorage — факт входа, независимо от разметки
    await app.page.waitForFunction(
      () => Boolean(window.localStorage.getItem('token')),
      null,
      { timeout: 15000 },
    );
  });

      test('Ошибка при вводе неверного пароля', async ({ app }) => {
    const invalidCredentials = {
      email: process.env.VIKUNJA_USER,
      password: 'WrongPassword123!',
    };

    await clearAuthState(app);

    await app.login.open();
    await app.login.login(invalidCredentials);

    await expect(app.login.errorMessage).toBeVisible();
  });

  test('Создание нового проекта через UI', async ({ app }) => {
    await app.as(testUser);

    const project = new ProjectBuilder().build();
    await app.projects.createProject(project.title);

    await expect(app.projects.getProjectLocator(project.title)).toBeVisible();
  });

  test('Создание задачи внутри проекта', async ({ app }) => {
    await app.as(testUser);

    const project = new ProjectBuilder().build();
    await app.projects.createProject(project.title);

    const task = new TaskBuilder().build();
    await app.projects.createTask(task.title);

    await expect(app.projects.getTaskLocator(task.title)).toBeVisible();
  });

  test('Выход из учетной записи (Logout)', async ({ app }) => {
    await app.as(testUser);

    await app.projects.logout();

    await expect(app.login.loginButton).toBeVisible({ timeout: 10000 });
  });

});
