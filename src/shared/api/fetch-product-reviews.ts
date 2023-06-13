import { Review } from "@shared/types/review";
import { api } from "./const";

export const fetchProductReviews = async ({
  productId,
  ...searchParams
}: {
  productId: string;
  searchValue?: string;
  hasReply?: boolean;
}) =>
  api
    .get(`product/${productId}/reviews`, {
      searchParams,
    })
    .json<Review[]>();
