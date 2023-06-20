import { Review } from "@shared/types/review";
import { api } from "./const";

type SearchParams = {
  productsSearch?: string;
  searchValue?: string;
  hasReply?: boolean;
};

const getSearchParams = ({
  productsSearch,
  searchValue,
  hasReply,
}: SearchParams) => ({
  ...(searchValue ? { searchValue } : {}),
  ...(hasReply ? { hasReply } : {}),
  ...(productsSearch ? { productsSearch } : {}),
});

const getParams = (searchParams?: SearchParams) => ({
 searchParams:
    searchParams && Object.keys(searchParams)
      ? getSearchParams(searchParams)
      : undefined,
});

export const fetchReviews = (searchParams?: SearchParams) =>
  api.get("reviews", getParams(searchParams)).json<Review[]>();
