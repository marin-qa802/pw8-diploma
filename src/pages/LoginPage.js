export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel('Username Or Email Address');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: /login/i });
    // Лучший локатор для ошибки на Vikunja - это блок с ролью alert
    this.errorMessage = page.getByRole('alert'); 
  }

  async open() {
    await this.page.goto('/login');
  }

  async login(user) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}



/*
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel('Username or Email');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: /login/i });
    // Добавляем локатор для сообщения об ошибке (может быть другой класс, проверь)
    this.errorMessage = page.locator('.alert-danger'); 
  }

  async open() {
    await this.page.goto('/login');
  }

  async login(user) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}
  */