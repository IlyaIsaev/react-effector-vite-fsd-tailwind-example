import { Review } from "@shared/types/review";
import { api } from "./const";

type SearchParams = {
  searchValue?: string;
  hasReply?: boolean;
};

const getSearchParams = ({ searchValue, hasReply }: SearchParams) => ({
  ...(searchValue ? { searchValue } : {}),
  ...(hasReply ? { hasReply } : {}),
});

const getParams = (searchParams: SearchParams) => ({
  searchParams: Object.keys(searchParams)
    ? getSearchParams(searchParams)
    : undefined,
});

export type FetchProductReviews = {
  productId: string;
} & SearchParams;

export const fetchProductReviews = async ({
  productId,
  ...searchParams
}: FetchProductReviews) =>
  api
    .get(`product/${productId}/reviews`, getParams(searchParams))
    .json<Review[]>();
