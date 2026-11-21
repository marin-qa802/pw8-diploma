export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Имя пользователя или Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
    this.loginButton = page.getByRole('button', { name: 'Войти' });
    this.errorMessage = page.getByRole('alert');

  }

    async open() {
    await this.page.goto('/login');
    // прелоадер Vikunja перекрывает клики — ждём, пока он исчезнет
    const loading = this.page.locator('.vikunja-loading');
    await loading.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }


  async login(user) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}