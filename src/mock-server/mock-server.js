import { faker } from "@faker-js/faker";
import {
  Factory,
  Model,
  belongsTo,
  createServer,
  hasMany,
  trait,
} from "miragejs";
import { filterReviews } from "./filter-reviews";

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
        return 0;
      },

      unreadReviewsNumber() {
        return 0;
      },

      withReviews: trait({
        afterCreate(product, server) {
          const reviews = server.createList("review", faker.number.int(20), {
            product,
          });

          product.update({
            reviewsNumber: reviews.length,
            unreadReviewsNumber: reviews.filter((review) => !review.read)
              .length,
          });
        },
      }),
    }),

    review: Factory.extend({
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

    this.get("/reviews/unreadCount", (schema) => {
      const products = schema.db.products;

      return products.reduce(
        (acc, product) => ({
          reviewsCount: acc.reviewsCount + product.reviewsNumber,
          unreadReviewsCount:
            acc.unreadReviewsCount + product.unreadReviewsNumber,
        }),
        {
          reviewsCount: 0,
          unreadReviewsCount: 0,
        }
      );
    });

    this.get("/product/:id/reviewsCountByReply", (schema, request) => {
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

      const { id: productId } = params;

      const reviews = schema.products.find(productId).reviews;

      return filterReviews(reviews, queryParams);
    });

    this.get("/reviews", (schema, request) => {
      const { queryParams } = request;

      const reviews = schema.reviews.all();

      return filterReviews(reviews, queryParams);
    });

    this.get("/reviews/countByReply", (schema) => {
      const reviews = schema.reviews.all();

      const withReply = reviews.filter((review) => review.reply).length;

      const withoutReply = reviews.filter((review) => !review.reply).length;

      return {
        withReply,
        withoutReply,
      };
    });
  },
});
