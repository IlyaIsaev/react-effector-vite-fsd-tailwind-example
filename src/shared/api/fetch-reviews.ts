import { Review } from "@shared/types/review";
import { API_NAMESPACE } from "./const";

export type FetchReviewsInput = {
  searchValue?: string;
  productId?: string;
  hasReply?: boolean;
};

export const fetchReviews = (input?: FetchReviewsInput) => {
  const { productId, searchValue, hasReply } = input || {};

  if (!productId) {
    throw new Error("can't invoke without productId");
  }

  const params = new URLSearchParams();

  if (searchValue) {
    params.set("searchValue", searchValue);
  }

  if (hasReply) {
    params.set("hasReply", String(hasReply));
  }

  return fetch(
    `/${API_NAMESPACE}/product/${productId}/reviews${
      Object.keys(params).length ? `?${params}` : ""
    }`
  )
    .then((res) => res.json())
    .then(({ reviews }) => reviews as Review[]);
};
