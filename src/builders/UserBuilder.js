// src/builders/UserBuilder.js
import { faker } from '@faker-js/faker';

export class UserBuilder {
  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
  }

  withUsername() {
    this.username = `${faker.person.firstName()}${faker.number.int(999)}`.toLowerCase();
    return this;
  }

  withEmail() {
    this.email = `${this.username}@test.mail`;
    return this;
  }

  withPassword() {
    this.password = faker.internet.password({ length: 12 });
    return this;
  }

  withFullName() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    return this;
  }

  build() {
    return { 
      username: this.username, 
      email: this.email, 
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }
}
