import { faker } from '@faker-js/faker';

export class TaskBuilder {
  constructor() {
    this.task = {
      title: faker.lorem.words(4),
      description: faker.lorem.sentence(),
      done: false,
    };
  }

  withTitle(title) {
    this.task.title = title;
    return this;
  }

  build() {
    return this.task;
  }
}

export class ProjectBuilder {
  constructor() {
    this.project = {
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
    };
  }

  withTitle(title) {
    this.project.title = title;
    return this;
  }

  build() {
    return this.project;
  }
}