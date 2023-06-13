import { Review } from "@shared/types/review";
import { api } from "./const";

export const fetchReviews = (searchParams?: {
  searchValue?: string;
  hasReply?: boolean;
}) =>
  api
    .get("reviews", {
      searchParams,
    })
    .json<Review[]>();
