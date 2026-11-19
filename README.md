# Дипломный проект: Фреймворк для UI + API тестов (Vikunja)

Проект представляет собой фреймворк для автоматизации тестирования веб-приложения Vikunja с использованием Playwright.

## Стек
* JavaScript / Node.js
* Playwright
* Allure Reporter
* GitHub Actions (CI/CD)

## Установка и запуск

1. Клонируйте репозиторий:
   `git clone https://github.com/marin-qa802/pw8.git`
2. Установите зависимости:
   `npm install`
3. Установите браузеры Playwright:
   `npx playwright install`
4. Создайте файл `.env` в корне проекта и заполните его по образцу `.env.example`:
   ```env
BASE_URL=https://try.vikunja.io
VIKUNJA_TOKEN=your_api_token_here
## Отчетность и уведомления

В проекте настроен CI/CD через GitHub Actions. После каждого пуша запускаются тесты.

### 1. Отчет Allure (100% Pass Rate)
![Allure Report](screenshots/allure-report.png.jpg)

### 2. Уведомление в Telegram
После завершения тестов бот присылает отчет:
![Telegram Notification](screenshots/telegram.png.jpg)

### 3. Успешный прогон в GitHub Actions
![GitHub Actions](screenshots/github-actions.png.jpg)