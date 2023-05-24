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

    this.get("/reviews-meta-info", (schema) => {
      const products = schema.db.products;

      return products.reduce(
        (acc, product) => ({
          number: acc.number + product.reviewsNumber,
          unreadNumber: acc.unreadNumber + product.unreadReviewsNumber,
        }),
        {
          number: 0,
          unreadNumber: 0,
        }
      );
    });
  },
});
