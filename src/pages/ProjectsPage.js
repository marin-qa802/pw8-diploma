export class ProjectsPage {
  constructor(page) {
    this.page = page;
    
    // 1. Имя пользователя на Vikunja
   this.profileName = page.locator('.username').first();     
    // 2. Список проектов
    this.projectList = page.locator('.project-list, .projects'); 
    
    // 3. Кнопка создания проекта
   this.createProjectButton = page.getByRole('button', { name: /new project|create project|добавить/i }).first();    // 4. Кнопка выхода
    this.logoutButton = page.getByRole('button', { name: /logout|sign out/i }); 
    
    // 5. Список задач
    this.taskList = page.locator('.task-list, .tasks');
  }
   async createProject(name) {
  // 1. Открываем страницу проектов (если ещё не на ней)
  await this.page.getByRole('link', { name: /projects/i }).first().click();

  // 2. Клик по ссылке "New project" — это link, а не button
  const createBtn = this.page
    .getByRole('link', { name: /new project/i })
    .first();
  await createBtn.waitFor({ state: 'visible', timeout: 15000 });
  await createBtn.click();

  // 3. На странице /projects/new вводим название.
  const nameInput = this.page
    .getByPlaceholder(/project.*(name|title)/i)
    .or(this.page.locator('main input[type="text"]').first());
  await nameInput.first().waitFor({ state: 'visible', timeout: 10000 });
  await nameInput.first().fill(name);

  // 4. Сохраняем
  await this.page.getByRole('button', { name: /create|save/i }).first().click();

  // 5. Ждем, пока проект реально создан и открыт
  await this.page.getByText(name).first().waitFor({ state: 'visible', timeout: 15000 });
}

  async openProject(projectName) {
  await this.page.waitForLoadState('networkidle');
  await this.page.getByText(projectName).first().click();
}
async createTask(taskName) {
  // В Vikunja нет кнопки "New task" — есть поле "Add a task…"
  const taskInput = this.page.getByPlaceholder('Add a task…');
  await taskInput.waitFor({ state: 'visible', timeout: 10000 });

  // 1. Сначала вводим название — кнопка Add активируется только после этого
  await taskInput.fill(taskName);

  // 2. Затем жмём Add (ждём, пока она станет активной)
  const addBtn = this.page.getByRole('button', { name: 'Add' });
  await addBtn.click({ timeout: 10000 });

  // 3. Ждём, пока задача реально появится в списке
  await this.page.getByText(taskName).first().waitFor({ state: 'visible', timeout: 15000 });
}

  async logout() {
    // Клик по аватару/меню в хедере, затем по кнопке выхода
    await this.page.locator('header').getByRole('button').last().click(); 
    await this.logoutButton.click();
  }
}