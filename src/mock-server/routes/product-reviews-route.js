import { filterReviews } from "../utils/filter-reviews";

export const productReviewsRoute = (schema, request) => {
  const { queryParams, params } = request;

  const { id: productId } = params;

  const reviews = schema.products.find(productId).reviews;

  return filterReviews(reviews.models, queryParams);
};
