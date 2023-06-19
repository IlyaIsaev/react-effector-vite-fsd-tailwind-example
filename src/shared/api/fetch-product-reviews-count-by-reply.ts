import { api } from "./const";

export const fetchProductReviewsCountByReply = async ({
  productId,
  ...searchParams
}: {
  productId?: string;
  searchValue?: string;
}) =>
  productId
    ? api
        .get(
          `product/${productId}/reviewsCountByReply`,
          searchParams && Object.keys(searchParams).length
            ? {
                searchParams,
              }
            : undefined
        )
        .json<{
          withReply: number;
          withoutReply: number;
        }>()
    : {
        withReply: 0,
        withoutReply: 0,
      };
