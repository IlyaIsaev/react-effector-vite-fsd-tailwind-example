import { api } from "./const";

type SearchParams = {
  searchValue?: string;
  productsSearch?: string;
};

const getSearchParams = ({ searchValue, productsSearch }: SearchParams) => ({
  ...(searchValue ? { searchValue } : {}),
  ...(productsSearch ? { productsSearch } : {}),
});

const getParams = (searchParams?: SearchParams) => ({
  searchParams:
    searchParams && Object.keys(searchParams)
      ? getSearchParams(searchParams)
      : undefined,
});

export const fetchReviewsCountByReply = (searchParams?: SearchParams) =>
  api.get("reviews/countByReply", getParams(searchParams)).json<{
    withReply: number;
    withoutReply: number;
  }>();
