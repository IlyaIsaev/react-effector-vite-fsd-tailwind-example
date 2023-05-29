import {
  createServer,
  Model,
  Factory,
  belongsTo,
  hasMany,
  trait,
} from "miragejs";
import { faker } from "@faker-js/faker";

createServer({
  models: {
    product: Model.extend({
      reviews: hasMany(),
    }),

    review: Model.extend({
      product: belongsTo(),
    }),
  },

  factories: {
    product: Factory.extend({
      name() {
        return faker.commerce.productName();
      },

      reviewsNumber() {
        return 10;
      },

      unreadReviewsNumber() {
        return 10;
      },

      withReviews: trait({
        afterCreate(product, server) {
          server.createList("review", faker.number.int(20), { product });
        },
      }),
    }),

    review: Factory.extend({
      title(i) {
        return `Review ${i}`;
      },

      read() {
        return faker.number.int(10) < 4;
      },

      reply() {
        const text = faker.lorem.text();

        const addReply = faker.number.int(10) < 4;

        return addReply ? text : null;
      },
    }),
  },

  seeds(server) {
    server.createList("product", 100, "withReviews");
  },

  routes() {
    this.namespace = "api";

    this.timing = 500;

    this.get("/products", (schema, request) => {
      const searchValue = request.queryParams.searchValue;

      if (searchValue) {
        return schema.products
          .all()
          .filter((product) => product.name.includes(searchValue));
      }

      return schema.products.all();
    });

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

    this.get("/products/reviewsNumberByReply", (schema) => {
      const reviews = schema.reviews.all();

      const { read, unread } = reviews.reduce(
        (acc, review) => {
          if (review.read) {
            acc.read = +1;
          }

          if (!review.read) {
            acc.unread = +1;
          }
        },
        {
          read,
          unread,
        }
      );

      return {
        read,
        unread,
        all: reviews.length,
      };
    });

    this.get("/product/:id/reviewsNumberByReply", (schema, request) => {
      const {
        params: { id: productId },
      } = request;

      const reviews = schema.products.find(productId).reviews;

      const withReply = reviews.filter((review) => review.reply).length;

      const withoutReply = reviews.filter((review) => !review.reply).length;

      return {
        withReply,
        withoutReply,
      };
    });

    this.get("/product/:id/reviews", (schema, request) => {
      const { queryParams, params } = request;

      const { hasReply } = queryParams;

      const { id: productId } = params;

      const reviews = schema.products.find(productId).reviews;

      if ("hasReply" in queryParams && hasReply) {
        return reviews.filter((review) => review.reply);
      }

      if ("hasReply" in queryParams && !hasReply) {
        return reviews.filter((review) => !review.reply);
      }

      return reviews;
    });
  },
});
