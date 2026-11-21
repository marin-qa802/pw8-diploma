export class AppApi {
  constructor(request) {
    this.request = request;
    this.token = null;
  }

  async login({ username, password }) {
    const response = await this.request.post('/api/v1/login', {
      data: { username, password },
    });
    if (!response.ok()) {
      throw new Error(`Login failed with status ${response.status()}`);
    }
    const body = await response.json();
    this.token = body.token;
  }

  headers() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async createProject(projectData) {
    return this.request.post('/api/v2/projects', { data: projectData, headers: this.headers() });
  }

  async updateProject(projectId, projectData) {
    return this.request.put(`/api/v2/projects/${projectId}`, { data: projectData, headers: this.headers() });
  }

  async getProjects() {
    return this.request.get('/api/v2/projects', { headers: this.headers() });
  }

  async createTask(projectId, taskData) {
    return this.request.post(`/api/v2/projects/${projectId}/tasks`, { data: taskData, headers: this.headers() });
  }

  async getTask(projectId, taskId) {
    return this.request.get(`/api/v2/projects/${projectId}/tasks/${taskId}`, { headers: this.headers() });
  }

  async deleteTask(projectId, taskId) {
    // Vikunja удаляет задачу по прямому пути /api/v2/tasks/{taskId}
    return this.request.delete(`/api/v2/tasks/${taskId}`, { headers: this.headers() });
  }
}
