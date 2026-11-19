import {faker} from '@faker-js/faker';
export class UserBuilder {

    withEmail() {
        this.email = faker.internet.email();
        return this;
    }
    withPassword(length = 10) {
        this.password = faker.internet.password({ length });
        return this;
    }
    withName() {
        this.name = faker.person.fullName();
        return this;
    }
      build() {
    const result = { ...this }; // Создаем поверхностную копию объекта
    return result;
  }
}
