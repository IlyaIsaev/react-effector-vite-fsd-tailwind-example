import { fetchProductReviews } from "@shared/api/fetch-product-reviews";
import { fetchReviews } from "@shared/api/fetch-reviews";
import { readReview } from "@shared/api/read-review";
import { controls, homeRoute } from "@shared/routes";
import { Review } from "@shared/types/review";
import { querySync } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

export const fetchReviewsFx = createEffect(fetchReviews);
export const fetchProductReviewsFx = createEffect(fetchProductReviews);
const readReviewFx = createEffect(readReview);

export const $reviewList = createStore<Review[]>([]);
export const $activeReviewId = createStore<Review["id"] | null>(null);

export const setActiveReview = createEvent<Review["id"] | null>();
export const closeReviewCard = createEvent();

sample({
  clock: [fetchReviewsFx.doneData, fetchProductReviewsFx.doneData],
  target: $reviewList,
});

sample({
  clock: setActiveReview,
  target: $activeReviewId,
});

sample({
  clock: closeReviewCard,
  fn: () => null,
  target: setActiveReview,
});

sample({
  clock: setActiveReview,
  source: $activeReviewId,
  filter: (activeReviewId) => Boolean(activeReviewId),
  fn: (data) => data as string,
  target: readReviewFx,
});

querySync({
  source: {
    review: $activeReviewId,
  },
  route: homeRoute,
  controls,
});
