import { api } from "./const";

export const fetchReviewsCountByReply = (searchParams?: {
  searchValue?: string;
}) =>
  api
    .get(
      "reviews/countByReply",
      searchParams && Object.keys(searchParams).length
        ? {
            searchParams,
          }
        : undefined
    )
    .json<{
      withReply: number;
      withoutReply: number;
    }>();
