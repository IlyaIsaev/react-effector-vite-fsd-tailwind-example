import { $activeProductId } from "@entities/product/model/product";
import { fetchCountByReply } from "@shared/api/fetch-count-by-reply";
import { fetchProductReviewsCountByReply } from "@shared/api/fetch-product-reviews-count-by-reply";
import { fetchReviews } from "@shared/api/fetch-reviews";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

export type TabType = null | "withReply" | "withoutReply";

const getReviewsFx = createEffect(fetchReviews);

export const getCountReviewsProductByReplyFx = createEffect(
  fetchProductReviewsCountByReply
);

export const getCountByReplyFx = createEffect(fetchCountByReply);

export const $activeTab = createStore<TabType>(null);

export const $tabReviewsNumber = createStore({
  withReply: 0,
  withoutReply: 0,
});

export const selectTab = createEvent<TabType>();

sample({
  clock: [
    getCountByReplyFx.doneData,
    getCountReviewsProductByReplyFx.doneData,
  ],
  target: $tabReviewsNumber,
});

sample({
  clock: selectTab,
  target: $activeTab,
});

sample({
  clock: $activeProductId,
  filter: (activeProductId) => activeProductId !== null,
  fn: (activeProductId) => ({
    productId: activeProductId,
  }),
  target: getCountReviewsProductByReplyFx,
});

sample({
  clock: $activeProductId,
  filter: (activeProductId) => activeProductId === null,
  fn: () => undefined,
  target: getCountByReplyFx,
});

sample({
  clock: homeRoute.opened,
  source: $activeProductId,
  filter: (_activeProductId, { query }) => !query.product,
  fn: (activeProductId) => ({
    productId: activeProductId,
  }),
  target: getCountByReplyFx,
});

sample({
  clock: $activeTab,
  source: $activeProductId,
  fn: (activeProductId, activeTab) => ({
    productId: activeProductId || undefined,
    ...(activeTab === null ? {} : { hasReply: activeTab === "withReply" }),
  }),
  target: getReviewsFx,
});

sample({
  clock: $activeProductId,
  source: $activeTab,
  fn: (activeTab, activeProductId) => ({
    productId: activeProductId || undefined,
    ...(activeTab === null ? {} : { hasReply: activeTab === "withReply" }),
  }),
  target: getReviewsFx,
});

querySync({
  source: {
    reply: $activeTab,
  },
  route: homeRoute,
  controls,
});
