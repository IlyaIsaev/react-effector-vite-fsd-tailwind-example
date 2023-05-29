import { $activeProduct } from "@entities/product";
import {$activeProductId} from "@entities/product/model/product";
import { fetchProductReviewsNumberByReply } from "@shared/api/fetch-product-reviews-number-by-reply";
import { fetchReviews } from "@shared/api/fetch-reviews";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export type TabType = null | "withReply" | "withoutReply";

const getReviewsFx = createEffect(fetchReviews);

const getProductReviewsNumberByReplyFx = createEffect(
  fetchProductReviewsNumberByReply
);

export const $activeTab = createStore<TabType>(null);

export const $tabReviewsNumber = restore(getProductReviewsNumberByReplyFx, {
  withReply: 0,
  withoutReply: 0,
});

export const selectTab = createEvent<TabType>();

querySync({
  source: {
    reply: $activeTab,
  },
  route: homeRoute,
  controls,
});

sample({
  clock: selectTab,
  target: $activeTab,
});

sample({
  clock: [$activeProductId],
  filter: (activeProductId) => Boolean(activeProductId),
  fn: (activeProductId) => ({
    productId: activeProductId,
  }),
  target: getProductReviewsNumberByReplyFx,
});

sample({
  clock: homeRoute.updated,
  fn: ({ query }) => {
    const productParam = {
      productId: query.product,
    };

    if (!query.reply) {
      return productParam;
    }

    return {
      ...productParam,
      hasReply: query.reply === "withReply",
    };
  },
  target: getReviewsFx,
});
