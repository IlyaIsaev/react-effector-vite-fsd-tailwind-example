import { api } from "./const";

type SearchParams = {
  searchValue?: string;
};

const getSearchParams = ({ searchValue }: SearchParams) => ({
  ...(searchValue ? { searchValue } : {}),
});

const getParams = (searchParams?: SearchParams) => ({
  searchParams:
    searchParams && Object.keys(searchParams)
      ? getSearchParams(searchParams)
      : undefined,
});

export const fetchReviewsUnreadCount = (searchParams?: SearchParams) =>
  api.get("reviews/unreadCount", getParams(searchParams)).json<{
    reviewsCount: number;
    unreadReviewsCount: number;
  }>();
