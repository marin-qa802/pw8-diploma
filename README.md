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