import { setProductActive } from "@entities/product";
import { fetchCountReviewsRead } from "@shared/api/fetch-count-reviews-read";
import { homeRoute } from "@shared/routes";
import { createEffect, createEvent, createStore, sample } from "effector";

export const $isActive = createStore(false);

export const $countReviewsRead = createStore({
  countReviews: 0,
  countReviewsUnread: 0,
});

export const getCountReviewsReadFx = createEffect(async () =>
  fetchCountReviewsRead()
);

export const setSelectAllProductsActive = createEvent<boolean>();

sample({
  clock: setSelectAllProductsActive,
  filter: (isActive) => isActive,
  fn: () => null,
  target: setProductActive,
});

sample({
  clock: setProductActive,
  fn: () => false,
  target: $isActive,
});

sample({
  clock: setSelectAllProductsActive,
  target: $isActive,
});

sample({
  clock: getCountReviewsReadFx.doneData,
  target: $countReviewsRead,
});

sample({
  clock: homeRoute.opened,
  filter: ({ query }) => !query.product,
  fn: () => true,
  target: setSelectAllProductsActive,
});

sample({
  clock: homeRoute.opened,
  target: getCountReviewsReadFx,
});
