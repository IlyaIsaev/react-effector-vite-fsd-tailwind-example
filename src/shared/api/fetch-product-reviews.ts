import { Review } from "@shared/types/review";
import { api } from "./const";

export const fetchProductReviews = async ({
  productId,
  ...searchParams
}: {
  productId?: string | null;
  searchValue?: string;
  hasReply?: boolean;
}) =>
  productId
    ? api
        .get(`product/${productId}/reviews`, {
          searchParams,
        })
        .json<Review[]>()
    : [];
