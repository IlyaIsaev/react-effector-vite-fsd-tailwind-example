import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";

export const reviewFactory = Factory.extend({
  text() {
    return faker.lorem.text();
  },

  date() {
    return faker.date.past();
  },

  author() {
    return faker.person.fullName();
  },

  rating() {
    return faker.number.int({ min: 1, max: 5 });
  },

  read() {
    return false;
  },

  reply() {
    const text = faker.lorem.text();

    const addReply = faker.number.int(10) < 4;

    return addReply ? text : null;
  },
});
