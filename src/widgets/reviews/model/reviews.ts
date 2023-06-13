import { $activeProductId, setProductActive } from "@entities/product";
import {
  closeReviewCard,
  fetchProductReviewsFx,
  fetchReviewsFx,
} from "@entities/review";
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
import { sample } from "effector";

const fetchReviewsClock = [
  homeRoute.opened,
  findReviews,
  clearReviewsSearch,
  setProductActive,
  selectReviewsByReply,
  closeReviewCard,
];

const paramsFetchReviews = sample({
  source: [$reviewsSearch, $replyReviewsSelected, $activeProductId],
  fn: ([reviewsSearch, reviewsSelectByReplyActiveTab, activeProductId]) => ({
    ...(activeProductId ? { productId: activeProductId } : {}),
    ...(reviewsSearch ? { searchValue: reviewsSearch } : {}),
    ...(reviewsSelectByReplyActiveTab
      ? { hasReply: reviewsSelectByReplyActiveTab === "withReply" }
      : {}),
  }),
});

sample({
  clock: fetchReviewsClock,
  source: paramsFetchReviews,
  filter: ({ productId }) => Boolean(productId),
  target: fetchProductReviewsFx,
});

sample({
  clock: fetchReviewsClock,
  source: paramsFetchReviews,
  filter: ({ productId }) => !productId,
  target: fetchReviewsFx,
});
