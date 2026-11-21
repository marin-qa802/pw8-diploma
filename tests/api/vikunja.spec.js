import { test, expect } from '../../src/fixtures/index';
import { TaskBuilder, ProjectBuilder } from '../../src/builders/task.builder';

test.describe('Vikunja API', () => {

  test('Создание нового проекта', async ({ api }) => {
    const projectData = new ProjectBuilder().withTitle('Мой тестовый проект').build();
    const response = await api.createProject(projectData);

    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.title).toBe('Мой тестовый проект');
  });

  test('Получение списка проектов', async ({ api }) => {
    const response = await api.getProjects();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('Создание задачи в проекте', async ({ api }) => {
    const projectData = new ProjectBuilder().build();
    const projRes = await api.createProject(projectData);
    const project = await projRes.json();

    const taskData = new TaskBuilder().withTitle('Купить хлеб').build();
    const taskRes = await api.createTask(project.id, taskData);

    expect([200, 201]).toContain(taskRes.status());
    const task = await taskRes.json();
    expect(task.title).toBe('Купить хлеб');
  });

  test('Удаление задачи и проверка, что её нет', async ({ api }) => {
    const projRes = await api.createProject(new ProjectBuilder().build());
    const proj = await projRes.json();
    
    const taskRes = await api.createTask(proj.id, new TaskBuilder().build());
    const task = await taskRes.json();
    
    const deleteRes = await api.deleteTask(proj.id, task.id);
  
    expect([200, 204]).toContain(deleteRes.status());     
    const checkRes = await api.getTask(proj.id, task.id);
    expect(checkRes.status()).toBe(404);
  });

  test('Обновление названия проекта', async ({ api }) => {
    const projRes = await api.createProject(new ProjectBuilder().withTitle('Старое имя').build());
    const proj = await projRes.json();
    
    // Используем метод updateProject, который мы сейчас добавим в фасад
    const updateRes = await api.updateProject(proj.id, { title: 'Новое имя' });
    
    expect(updateRes.status()).toBe(200);
    const updated = await updateRes.json();
    expect(updated.title).toBe('Новое имя');
  });
});