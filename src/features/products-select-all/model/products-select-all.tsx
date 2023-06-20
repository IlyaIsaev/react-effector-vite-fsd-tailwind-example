import { setProductActive } from "@entities/product";
import { fetchReviewsUnreadCount } from "@shared/api/fetch-reviews-unread-count";
import { homeRoute } from "@shared/routes";
import { createEffect, createEvent, createStore, sample } from "effector";

export const fetchReviewsUnreadCountFx = createEffect(fetchReviewsUnreadCount);

export const $productsSelectAllActive = createStore(false);

export const $reviewsCount = createStore({
  reviewsCount: 0,
  unreadReviewsCount: 0,
});

export const setProductsSelectAllActive = createEvent<boolean>();

sample({
  clock: setProductsSelectAllActive,
  filter: (isActive) => isActive,
  fn: () => null,
  target: setProductActive,
});

sample({
  clock: setProductActive,
  fn: () => false,
  target: $productsSelectAllActive,
});

sample({
  clock: setProductsSelectAllActive,
  target: $productsSelectAllActive,
});

sample({
  clock: fetchReviewsUnreadCountFx.doneData,
  target: $reviewsCount,
});

sample({
  clock: homeRoute.opened,
  filter: ({ query }) => !query.product,
  fn: () => true,
  target: setProductsSelectAllActive,
});

// sample({
// clock: homeRoute.opened,
// fn: () => undefined,
// target: fetchReviewsUnreadCountFx,
// });
