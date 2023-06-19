import { api } from "./const";

export const fetchReviewsUnreadCount = (searchParams?: {
  searchValue?: string;
}) =>
  api
    .get(
      "reviews/unreadCount",
      searchParams && Object.keys(searchParams).length
        ? {
            searchParams,
          }
        : undefined
    )
    .json<{
      reviewsCount: number;
      unreadReviewsCount: number;
    }>();
