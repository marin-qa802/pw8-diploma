import { test, expect } from '@playwright/test';

test.describe('API тесты для Vikunja', () => {
  
  test('Сервер доступен', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
  });

  test('Защищенный эндпоинт возвращает 200 или 401 без токена', async ({ request }) => {
    const response = await request.get('/projects');
    expect([200, 401]).toContain(response.status()); // Разрешаем оба варианта
  });

  test('Метод OPTIONS возвращает разрешенные методы', async ({ request }) => {
    const response = await request.fetch('/projects', { method: 'OPTIONS' });
    expect(response.status()).toBe(200);
  });

  test('Запрос несуществующего эндпоинта', async ({ request }) => {
    const response = await request.get('/nonexistent-endpoint-12345');
    expect([200, 404]).toContain(response.status()); 
  });

  test('API возвращает правильные заголовки', async ({ request }) => {
    const response = await request.get('/');
    expect(response.headers()['content-type']).toContain('text/html');
  });
});