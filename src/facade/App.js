import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { ProjectsPage } from '../pages/ProjectsPage.js';

export class App {
  constructor(page, api) {
    this.page = page;
    this.api = api;
    this.loginPage = new LoginPage(page);
    this.registerPage = new RegisterPage(page);
    this.projects = new ProjectsPage(page);
  }

  async as(user) {
    await this.loginPage.open();
    await this.loginPage.login(user);
  }
}
