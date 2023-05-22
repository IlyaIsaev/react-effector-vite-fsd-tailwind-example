import { createServer, Model, Factory } from "miragejs";
import { faker } from "@faker-js/faker";

createServer({
  models: {
    product: Model,
  },

  factories: {
    product: Factory.extend({
      id() {
        return faker.string.uuid();
      },

      name() {
        return faker.commerce.productName();
      },

      reviewsNumber() {
        return 10;
      },

      unreadReviewsNumber() {
        return 10;
      },
    }),
  },

  seeds(server) {
    server.createList("product", 100);
  },

  routes() {
    this.namespace = "api";

    this.timing = 1000;

    this.get("/products");
  },
});
