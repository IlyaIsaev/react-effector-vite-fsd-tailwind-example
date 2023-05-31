import { API_NAMESPACE } from "./const";

export type FetchCountReviewsRead = {
  searchValue?: string;
  productId?: string;
  hasReply?: boolean;
};

export const fetchCountReviewsRead = (input?: FetchCountReviewsRead) => {
  const { searchValue } = input || {};

  const params = new URLSearchParams();

  if (searchValue) {
    params.set("searchValue", searchValue);
  }

  return fetch(
    `/${API_NAMESPACE}/products/countReviewsRead${
      Object.keys(params).length ? `?${params}` : ""
    }`
  )
    .then((res) => res.json())
    .then(
      (count) =>
        count as {
          countReviews: number;
          countReviewsUnread: number;
        }
    );
};
