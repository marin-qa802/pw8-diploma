export class ProjectsPage {
  constructor(page) {
    this.page = page;
    this.profileName = page.locator('.username').first();
    this.projectList = page.locator('.project-list, .projects');
    this.taskList = page.locator('.task-list, .tasks');
  }

  async open() {
    await this.page.goto('/projects');
  }

  async createProject(name) {
    await this.page.getByRole('link', { name: 'Проекты' }).click();
    await this.page.getByRole('link', { name: 'Создать проект' }).click();

    const nameInput = this.page.getByRole('textbox', { name: 'Название' });
    await nameInput.waitFor({ state: 'visible', timeout: 15000 });
    await nameInput.fill(name);

    // ждём редирект на страницу созданного проекта — факт создания
    await Promise.all([
      this.page.waitForURL(/\/projects\/\d+/, { timeout: 15000 }),
      this.page.getByRole('button', { name: 'Создать' }).click(),
    ]);
  }

  async createTask(taskName) {
    const addInput = this.page.getByRole('textbox', { name: 'Добавить задачу…' });
    await addInput.waitFor({ state: 'visible', timeout: 15000 });
    await addInput.fill(taskName);

    const addBtn = this.page.getByRole('button', { name: 'Добавить' });
    if (await addBtn.isVisible()) {
      await addBtn.click();
    } else {
      await addInput.press('Enter');
    }

    await this.page.getByText(taskName).first().waitFor({ state: 'visible', timeout: 15000 });
  }

  getProjectLocator(name) {
    // проект в сайдбаре — это ссылка с его названием
    return this.page.getByRole('link', { name }).first();
  }

  getTaskLocator(name) {
    return this.page.getByText(name).first();
  }

  async openProject(projectName) {
    await this.page.getByText(projectName).first().click();
  }

  async logout() {
    await this.page.locator('nav, header').getByRole('button').last().click();

    const logoutItem = this.page
      .getByRole('link', { name: 'Выйти' })
      .or(this.page.getByRole('button', { name: 'Выйти' }));
    await logoutItem.first().click({ timeout: 10000 });
  }
}
