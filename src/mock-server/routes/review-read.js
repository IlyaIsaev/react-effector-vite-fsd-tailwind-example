export const reviewReadRoute = (schema, request) => {
  const { params } = request;

  const { id: reviewId } = params;

  const review = schema.reviews.find(reviewId);

  review.update("read", true);

  return null;
};
