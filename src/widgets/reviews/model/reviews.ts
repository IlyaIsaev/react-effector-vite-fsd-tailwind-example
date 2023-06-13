import { $activeProductId, setProductActive } from "@entities/product";
import { fetchProductReviewsFx, fetchReviewsFx } from "@entities/review";
import {
  $reviewsSearch,
  clearReviewsSearch,
  findReviews,
} from "@features/reviews-search";
import {
  $replyReviewsSelected,
  selectReviewsByReply,
} from "@features/reviews-select-by-reply";
import { homeRoute } from "@shared/routes";
import { attach, createEffect, sample } from "effector";

type ReviewsParams = (string | null)[];

const getReviewsParams = ([
  reviewsSearch,
  reviewsSelectByReplyActiveTab,
]: ReviewsParams) => ({
  ...(reviewsSearch ? { searchValue: reviewsSearch } : {}),

  ...(reviewsSelectByReplyActiveTab
    ? { hasReply: reviewsSelectByReplyActiveTab === "withReply" }
    : {}),
});

const getReviewsFx = attach({
  effect: fetchReviewsFx,
  mapParams: getReviewsParams,
});

const getProductReviewsFx = attach({
  effect: fetchProductReviewsFx,
  mapParams: ([
    reviewsSearch,
    reviewsSelectByReplyActiveTab,
    activeProductId,
  ]) => ({
    productId: activeProductId,
    ...getReviewsParams([reviewsSearch, reviewsSelectByReplyActiveTab]),
  }),
});

sample({
  clock: [
    homeRoute.opened,
    findReviews,
    clearReviewsSearch,
    setProductActive,
    selectReviewsByReply,
  ],

  source: [$reviewsSearch, $replyReviewsSelected, $activeProductId],

  target: createEffect((sourceData: ReviewsParams) => {
    const [, , activeProductId] = sourceData;

    if (activeProductId) {
      getProductReviewsFx(sourceData);
    }

    if (!activeProductId) {
      getReviewsFx(sourceData);
    }
  }),
});
