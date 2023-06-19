import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEvent, createStore, sample } from "effector";

export const $reviewsSearch = createStore("");

export const findReviews = createEvent();

export const clearReviewsSearch = createEvent();

export const changeReviewsSearch = createEvent<string>();

sample({
  clock: changeReviewsSearch,
  target: $reviewsSearch,
});

sample({
  clock: clearReviewsSearch,
  fn: () => "",
  target: $reviewsSearch,
});

querySync({
  clock: [findReviews, clearReviewsSearch],
  source: { reviewsSearch: $reviewsSearch },
  route: homeRoute,
  controls,
});

sample({
  clock: homeRoute.opened,
  fn: (clockData) => clockData?.query.reviewsSearch || "",
  target: $reviewsSearch,
});
