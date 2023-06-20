export const reviewsUnreadCountRoute = (schema, request) => {
  const searchValue = request.queryParams.searchValue;

  const products = searchValue
    ? schema.db.products.filter((product) => product.name.includes(searchValue))
    : schema.db.products;

  return products.reduce(
    (acc, product) => ({
      reviewsCount: acc.reviewsCount + product.reviewsNumber,
      unreadReviewsCount: acc.unreadReviewsCount + product.unreadReviewsNumber,
    }),
    {
      reviewsCount: 0,
      unreadReviewsCount: 0,
    }
  );
};
