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
    const email = user.email ?? user.username;

    // Vikunja перерисовывает форму после ввода логина — поле может «отвязаться»,
    // поэтому заполняем оба поля с повторами
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.emailInput.fill(email, { timeout: 5000 });
        await this.passwordInput.fill(user.password, { timeout: 5000 });
        break;
      } catch (err) {
        if (attempt === 3) throw err;
      }
    }

    await this.loginButton.click();
  }

}