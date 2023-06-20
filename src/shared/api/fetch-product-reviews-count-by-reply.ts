import { api } from "./const";

type SearchParams = {
  searchValue?: string;
};

const getSearchParams = ({ searchValue }: SearchParams) => ({
  ...(searchValue ? { searchValue } : {}),
});

const getParams = (searchParams: SearchParams) => ({
  searchParams: Object.keys(searchParams)
    ? getSearchParams(searchParams)
    : undefined,
});

export type FetchProductReviewsCountByReply = {
  productId: string;
} & SearchParams;

export const fetchProductReviewsCountByReply = async ({
  productId,
  ...searchParams
}: FetchProductReviewsCountByReply) =>
  api
    .get(`product/${productId}/reviewsCountByReply`, getParams(searchParams))
    .json<{
      withReply: number;
      withoutReply: number;
    }>();
