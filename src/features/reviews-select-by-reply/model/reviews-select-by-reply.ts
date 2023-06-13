import { $activeProductId, setProductActive } from "@entities/product";
import { fetchProductReviewsCountByReply } from "@shared/api/fetch-product-reviews-count-by-reply";
import { fetchReviewsCountByReply } from "@shared/api/fetch-reviews-count-by-reply";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

export type TabType = null | "withReply" | "withoutReply";

export const fetchReviewsCountByReplyFx = createEffect(
  fetchReviewsCountByReply
);

export const fetchProductReviewsCountByReplyFx = createEffect(
  fetchProductReviewsCountByReply
);

export const $replyReviewsSelected = createStore<TabType>(null);

export const $tabReviewsNumber = createStore({
  withReply: 0,
  withoutReply: 0,
});

export const selectReviewsByReply = createEvent<TabType>();

sample({
  clock: [
    fetchReviewsCountByReplyFx.doneData,
    fetchProductReviewsCountByReplyFx.doneData,
  ],
  target: $tabReviewsNumber,
});

sample({
  clock: selectReviewsByReply,
  target: $replyReviewsSelected,
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
  fn: (_activeProductId, { query }) => ({
    productId: query.product,
  }),
  target: fetchProductReviewsCountByReplyFx,
});

querySync({
  source: {
    reply: $replyReviewsSelected,
  },
  route: homeRoute,
  controls,
});
