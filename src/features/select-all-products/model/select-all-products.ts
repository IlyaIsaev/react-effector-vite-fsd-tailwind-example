import { setProductActive } from "@entities/product";
import { fetchReviewsMetaInfo } from "@shared/api/fetch-reviews-meta-info";
import { homeRoute } from "@shared/routes";
import { createEffect, createEvent, createStore, sample } from "effector";

export const $isActive = createStore(false);

export const $reviewsMetaInfo = createStore({
  number: 0,
  unreadNumber: 0,
});

export const getReviewsMetaInfoFx = createEffect(async () =>
  fetchReviewsMetaInfo()
);

export const setSelectAllProductsActive = createEvent<boolean>();

sample({
  clock: setSelectAllProductsActive,
  filter: (isActive) => isActive,
  fn: () => null,
  target: setProductActive
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
  clock: getReviewsMetaInfoFx.doneData,
  target: $reviewsMetaInfo,
});

sample({
  clock: homeRoute.opened,
  target: getReviewsMetaInfoFx,
});
