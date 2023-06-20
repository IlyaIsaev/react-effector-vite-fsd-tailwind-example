import { Model, belongsTo, createServer, hasMany } from "miragejs";
import { productFactory } from "./factories/product-factory";
import { reviewFactory } from "./factories/review-factory";
import { productReviewsCountByReplyRoute } from "./routes/product-reviews-count-by-reply-route";
import { productReviewsRoute } from "./routes/product-reviews-route";
import { productsRoute } from "./routes/products-route";
import { reviewReadRoute } from "./routes/review-read";
import { reviewsCountByReplyRoute } from "./routes/reviews-count-by-reply-route";
import { reviewsRoute } from "./routes/reviews-route";
import { reviewsUnreadCountRoute } from "./routes/reviews-unread-count-route";

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
    product: productFactory,

    review: reviewFactory,
  },

  seeds(server) {
    server.createList("product", 100, "withReviews");
  },

  routes() {
    this.namespace = "api";

    this.timing = 500;

    this.get("/products", productsRoute);

    this.get("/reviews/unreadCount", reviewsUnreadCountRoute);

    this.get(
      "/product/:id/reviewsCountByReply",
      productReviewsCountByReplyRoute
    );

    this.get("/product/:id/reviews", productReviewsRoute);

    this.get("/reviews", reviewsRoute);

    this.get("/reviews/countByReply", reviewsCountByReplyRoute);

    this.get("/review/:id/read", reviewReadRoute);
  },
});
