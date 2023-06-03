import { api } from "./const";

export const fetchReviewsCountByReply = (searchParams?: {
  searchValue?: string;
}) =>
  api
    .get("reviews/countByReply", {
      searchParams,
    })
    .json<{
      withReply: number;
      withoutReply: number;
    }>();
