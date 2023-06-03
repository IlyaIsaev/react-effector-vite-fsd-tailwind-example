import { fetchProductReviews } from "@shared/api/fetch-product-reviews";
import { fetchReviews } from "@shared/api/fetch-reviews";
import { controls, homeRoute } from "@shared/routes";
import { Review } from "@shared/types/review";
import { querySync } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

export const fetchReviewsFx = createEffect(fetchReviews);
export const fetchProductReviewsFx = createEffect(fetchProductReviews);

export const $reviewList = createStore<Review[]>([]);
export const $activeReviewId = createStore<Review["id"] | null>(null);

export const setReviewActive = createEvent<Review["id"]>();

sample({
  clock: [fetchReviewsFx.doneData, fetchProductReviewsFx.doneData],
  target: $reviewList,
});

sample({
  clock: setReviewActive,
  target: $activeReviewId,
});

querySync({
  source: {
    review: $activeReviewId,
  },
  route: homeRoute,
  controls,
});

sample({
  clock: [homeRoute.opened, homeRoute.updated],
  filter: ({ query: { product } }) => !product,
  fn: ({ query: { reply } }) => ({
    ...(reply !== undefined ? { hasReply: reply === "withReply" } : {}),
  }),
  target: fetchReviewsFx,
});

sample({
  clock: [homeRoute.opened, homeRoute.updated],
  filter: ({ query: { product } }) => Boolean(product),
  fn: ({ query: { product, reply } }) => ({
    productId: product,
    ...(reply !== undefined ? { hasReply: reply === "withReply" } : {}),
  }),
  target: fetchProductReviewsFx,
});
