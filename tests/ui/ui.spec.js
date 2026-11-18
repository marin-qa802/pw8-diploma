import { test, expect } from '../../src/fixtures/index.js';
import { UserBuilder } from '../../src/builders/UserBuilder';

test.describe('UI тесты для Vikunja', () => {

  // 1. Функциональный UI тест: Логин и проверка имени
  test('Пользователь может войти и увидеть свое имя', async ({ app }) => {
    const user = UserBuilder.demoUser();
    
    await app.login.open();
    await app.login.login(user);
    
    // Ассерт строго в тесте
    await expect(app.dashboard.profileName).toContainText(user.username);
  });

  // 2. Функциональный UI тест: Создание проекта
  test('Пользователь создает новый проект', async ({ app }) => {
    const user = UserBuilder.demoUser();
    
    await app.login.open();
    await app.login.login(user);
    
    const projectName = 'New Test Project';
    await app.dashboard.createProject(projectName);
    
    // Проверяем, что проект появился в списке
    await expect(app.dashboard.projectList).toContainText(projectName);
  });

  // 3. Функциональный UI тест: Создание задачи в проекте
  test('Пользователь создает задачу в проекте', async ({ app }) => {
  const user = UserBuilder.demoUser();
  const projectName = `Project_${Date.now()}`; // Уникальное имя
  const taskName = 'My New Task';
  
  await app.login.open();
  await app.login.login(user);
  
  // Сначала создаем проект
  await app.dashboard.createProject(projectName);
  
  // Теперь открываем его и создаем задачу
  await app.dashboard.openProject(projectName);
  await app.dashboard.createTask(taskName);
  
  await expect(app.dashboard.taskList).toContainText(taskName);
  
});

  // 4. Функциональный UI тест: Выход из системы
  test('Пользователь может выйти из системы', async ({ app }) => {
    const user = UserBuilder.demoUser();
    
    await app.login.open();
    await app.login.login(user);
    
    await app.dashboard.logout();
    
    // Проверяем, что вернулись на страницу логина
    await expect(app.login.loginButton).toBeVisible();
  });

  // 5. Функциональный UI тест: Проверка ошибки при неверном пароле
  test('Показ ошибки при неверном пароле', async ({ app }) => {
    const user = UserBuilder.demoUser();
    
    await app.login.open();
    
    // Пытаемся войти с неверным паролем
    await app.login.login({ ...user, password: 'WrongPassword123' });
    
    // Проверяем, что появилось сообщение об ошибке
    await expect(app.login.errorMessage).toBeVisible();
  });
});