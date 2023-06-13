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

export const setActiveReview = createEvent<Review["id"] | null>();

sample({
  clock: [fetchReviewsFx.doneData, fetchProductReviewsFx.doneData],
  target: $reviewList,
});

sample({
  clock: setActiveReview,
  target: $activeReviewId,
});

querySync({
  source: {
    review: $activeReviewId,
  },
  route: homeRoute,
  controls,
});
