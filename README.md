# Дипломный проект: Фреймворк для UI + API тестов

## Описание
Фреймворк для автоматизации тестирования UI и API на базе Playwright. 
Реализована архитектура POM, Facade и Builder.

## Стек
* JavaScript / Node.js
* Playwright
* Allure Reporter
* GitHub Actions (CI/CD)

## Установка и запуск
1. Установите зависимости:
   `npm install`
2. Установите браузеры Playwright:
   `npx playwright install`
3. Запустите тесты:
   `npx playwright test`

## Структура проекта
* `src/` — Page Object'ы, фасады, билдеры, фикстуры.
* `tests/ui` — UI тесты.
* `tests/api` — API тесты.
* `.github/workflows` — настройки CI/CD для GitHub Actions.

## Отчетность
Результаты прогонов отправляются в **Allure TestOps**.
[Ссылка на проект в Allure] (вставь ссылку)

## Уведомления
После прогона в CI уведомление приходит в Telegram.
(Тут позже добавь скриншот сообщения от бота)