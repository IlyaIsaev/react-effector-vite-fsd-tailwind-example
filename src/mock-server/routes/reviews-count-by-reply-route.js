import { filterReviews } from "../utils/filter-reviews";
import { getProductsReviews } from "../utils/get-products-reviews";

export const reviewsCountByReplyRoute = (schema, request) => {
  const {
    queryParams: { productsSearch, ...queryParams },
  } = request;

  const reviewsByProductSearch = getProductsReviews(
    schema.products.all(),
    productsSearch
  );

  const reviews = filterReviews(
    productsSearch ? reviewsByProductSearch : schema.reviews.all().models,
    queryParams
  );

  const withReply = reviews.filter((review) => review.reply).length;

  const withoutReply = reviews.filter((review) => !review.reply).length;

  return {
    withReply,
    withoutReply,
  };
};
