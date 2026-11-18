import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { ProjectsPage } from '../pages/ProjectsPage.js';

export class App {
  constructor(page, api) {
    this.page = page;
    this.api = api;
    this.dashboard = new ProjectsPage(page);
    this.login = new LoginPage(page); // <--- здесь this.login        // <--- БЫЛО loginPage, стало login
    this.register = new RegisterPage(page);  // <--- БЫЛО registerPage, стало register
    this.projects = new ProjectsPage(page);  // <--- БЫЛО projects, оставляем
  }

  async as(user) {
  await this.login.open();     // БЫЛО loginPage
  await this.login.login(user); // БЫЛО loginPage
  }
}
