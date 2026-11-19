export class VikunjaMainPage {
  constructor(page) {
    this.page = page;
    
    // Оставляем только проверенные локаторы
    this.usernameInput = page.getByRole('textbox', { name: /username/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.submitButton = page.getByRole('button', { name: /login/i });
  }

  async open() {
    // Переходим сразу на страницу логина, чтобы не ждать редиректов
    await this.page.goto('/login'); 
  }
}