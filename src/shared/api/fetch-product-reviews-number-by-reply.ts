import { API_NAMESPACE } from "./const";

export type FetchProductReviewsNumberByReplyInput = {
  productId?: string | null;
  searchValue?: string;
};

export const fetchProductReviewsNumberByReply = (
  input: FetchProductReviewsNumberByReplyInput
) => {
  const { productId, searchValue } = input;

  if (!productId) {
    throw new Error("can't invoke without productId");
  }

  const params = new URLSearchParams();

  if (searchValue) {
    params.set("searchValue", searchValue);
  }

  return fetch(
    `/${API_NAMESPACE}/product/${productId}/reviewsNumberByReply${
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
