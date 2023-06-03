import { api } from "./const";

export const fetchProductReviewsCountByReply = async ({
  productId,
  ...searchParams
}: {
  productId: string;
  searchValue?: string;
}) =>
  api
    .get(`product/${productId}/reviewsCountByReply`, {
      searchParams,
    })
    .json<{
      withReply: number;
      withoutReply: number;
    }>();
