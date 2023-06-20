import { filterReviews } from "../utils/filter-reviews";
import { getProductsReviews } from "../utils/get-products-reviews";

export const reviewsRoute = (schema, request) => {
  const {
    queryParams: { productsSearch, ...queryParams },
  } = request;

  const reviewsByProductSearch = getProductsReviews(
    schema.products.all(),
    productsSearch
  );

  const reviews = productsSearch
    ? reviewsByProductSearch
    : schema.reviews.all().models;

  return filterReviews(reviews, queryParams);
};
