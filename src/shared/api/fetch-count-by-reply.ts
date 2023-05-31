import { API_NAMESPACE } from "./const";

export type FetchCountByReply = {
  productId?: string | null;
  searchValue?: string;
};

export const fetchCountByReply = (input?: FetchCountByReply) => {
  const { searchValue } = input || {};

  const params = new URLSearchParams();

  if (searchValue) {
    params.set("searchValue", searchValue);
  }

  return fetch(
    `/${API_NAMESPACE}/products/reviewsCountByReply${
      Object.keys(params).length ? `?${params}` : ""
    }`
  )
    .then((res) => res.json())
    .then(
      (res) =>
        res as {
          withReply: number;
          withoutReply: number;
        }
    );
};
