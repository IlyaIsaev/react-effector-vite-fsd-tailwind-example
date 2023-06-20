import { filterReviews } from "../utils/filter-reviews";

export const productReviewsCountByReplyRoute = (schema, request) => {
  const {
    params: { id: productId },
    queryParams,
  } = request;

  const reviews = filterReviews(
    schema.products.find(productId).reviews.models,
    queryParams
  );

  const withReply = reviews.filter((review) => review.reply).length;

  const withoutReply = reviews.filter((review) => !review.reply).length;

  return {
    withReply,
    withoutReply,
  };
};
