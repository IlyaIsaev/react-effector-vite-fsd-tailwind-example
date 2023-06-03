import { $activeProductId, setProductActive } from "@entities/product";
import { fetchProductReviews } from "@shared/api/fetch-product-reviews";
import { fetchProductReviewsCountByReply } from "@shared/api/fetch-product-reviews-count-by-reply";
import { fetchReviews } from "@shared/api/fetch-reviews";
import { fetchReviewsCountByReply } from "@shared/api/fetch-reviews-count-by-reply";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

export type TabType = null | "withReply" | "withoutReply";

const fetchReviewsFx = createEffect(fetchReviews);

const fetchProductReviewsFx = createEffect(fetchProductReviews);

export const fetchReviewsCountByReplyFx = createEffect(
  fetchReviewsCountByReply
);

export const fetchProductReviewsCountByReplyFx = createEffect(
  fetchProductReviewsCountByReply
);

export const $activeTab = createStore<TabType>(null);

export const $tabReviewsNumber = createStore({
  withReply: 0,
  withoutReply: 0,
});

export const setTabActive = createEvent<TabType>();

sample({
  clock: [
    fetchReviewsCountByReplyFx.doneData,
    fetchProductReviewsCountByReplyFx.doneData,
  ],
  target: $tabReviewsNumber,
});

sample({
  clock: setTabActive,
  target: $activeTab,
});

sample({
  clock: setProductActive,
  filter: (activeProductId) => activeProductId === null,
  fn: () => undefined,
  target: fetchReviewsCountByReplyFx,
});

sample({
  clock: setProductActive,
  filter: (activeProductId) => activeProductId !== null,
  fn: (activeProductId) => ({
    productId: activeProductId as string,
  }),
  target: fetchProductReviewsCountByReplyFx,
});

sample({
  clock: homeRoute.opened,
  source: $activeProductId,
  filter: (_activeProductId, { query }) => !query.product,
  fn: () => undefined,
  target: fetchReviewsCountByReplyFx,
});

sample({
  clock: homeRoute.opened,
  source: $activeProductId,
  filter: (_activeProductId, { query }) => Boolean(query.product),
  fn: (activeProductId) => ({
    productId: activeProductId as string,
  }),
  target: fetchProductReviewsCountByReplyFx,
});

sample({
  clock: [setTabActive, setProductActive],
  source: [$activeTab, $activeProductId],
  filter: (sourceData) => sourceData[1] !== null,
  fn: ([activeTab, activeProductId]) => ({
    productId: activeProductId as string,
    ...(activeTab === null ? {} : { hasReply: activeTab === "withReply" }),
  }),
  target: fetchProductReviewsFx,
});

sample({
  clock: [setTabActive, setProductActive],
  source: [$activeTab, $activeProductId],
  filter: (sourceData) => sourceData[1] === null,
  fn: ([activeTab]) => ({
    ...(activeTab === null ? {} : { hasReply: activeTab === "withReply" }),
  }),
  target: fetchReviewsFx,
});

querySync({
  source: {
    reply: $activeTab,
  },
  route: homeRoute,
  controls,
});
