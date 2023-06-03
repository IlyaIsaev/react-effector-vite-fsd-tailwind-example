import { api } from "./const";

export const fetchReviewsUnreadCount = (searchParams?: {
  searchValue?: string;
  hasReply?: boolean;
}) =>
  api
    .get("reviews/unreadCount", {
      searchParams,
    })
    .json<{
      reviewsCount: number;
      unreadReviewsCount: number;
    }>();
