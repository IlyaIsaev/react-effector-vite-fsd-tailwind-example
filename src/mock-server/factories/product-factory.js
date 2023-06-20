import { faker } from "@faker-js/faker";
import { Factory, trait } from "miragejs";

export const productFactory = Factory.extend({
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
        unreadReviewsNumber: reviews.filter((review) => !review.read).length,
      });
    },
  }),
});
