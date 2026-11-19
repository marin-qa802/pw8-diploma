export class AppApi {
  constructor(request) {
    this.request = request;
  }

  //  методы ...

  async createProject(projectData) {
    return this.request.post('/api/v2/projects', { data: projectData });
  }

  async updateProject(projectId, projectData) {
    return this.request.put(`/api/v2/projects/${projectId}`, { data: projectData });
  }

  async getProjects() {
    return this.request.get('/api/v2/projects');
  }

  async createTask(projectId, taskData) {
    return this.request.post(`/api/v2/projects/${projectId}/tasks`, { data: taskData });
  }

  async getTask(projectId, taskId) {
    return this.request.get(`/api/v2/projects/${projectId}/tasks/${taskId}`);
  }

    async deleteTask(projectId, taskId) {
    // Vikunja удаляет задачу по прямому пути /api/v2/tasks/{taskId}
    return this.request.delete(`/api/v2/tasks/${taskId}`);
  }
}