import {setProductActive} from "@entities/product";
import {fetchReviewsUnreadCount} from "@shared/api/fetch-reviews-unread-count";
import {homeRoute} from "@shared/routes";
import {createEffect, createEvent, createStore, sample} from "effector";

export const fetchReviewsUnreadCountFx = createEffect(fetchReviewsUnreadCount);

export const $isSelectAllProductsActive = createStore(false);

export const $reviewsCount = createStore({
  reviewsCount: 0,
  unreadReviewsCount: 0,
});

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
  target: $isSelectAllProductsActive,
});

sample({
  clock: setSelectAllProductsActive,
  target: $isSelectAllProductsActive,
});

sample({
  clock: fetchReviewsUnreadCountFx.doneData,
  target: $reviewsCount,
});

sample({
  clock: homeRoute.opened,
  filter: ({ query }) => !query.product,
  fn: () => true,
  target: setSelectAllProductsActive,
});

sample({
  clock: homeRoute.opened,
  fn: () => undefined,
  target: fetchReviewsUnreadCountFx,
});
