import { $activeProductId, setProductActive } from "@entities/product";
import {
  closeReviewCard,
  fetchProductReviewsFx,
  fetchReviewsFx,
} from "@entities/review";
import { $productsSearch, findProducts } from "@features/products-search";
import { fetchReviewsUnreadCountFx } from "@features/products-select-all";
import {
  $reviewsSearch,
  clearReviewsSearch,
  findReviews,
} from "@features/reviews-search";
import {
  $replyReviewsSelected,
  fetchProductReviewsCountByReplyFx,
  fetchReviewsCountByReplyFx,
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

sample({
  clock: [homeRoute.opened, findReviews, clearReviewsSearch, setProductActive],
  source: paramsFetchReviews,
  filter: ({ productId }) => !productId,
  fn: ({ searchValue }) => ({
    ...(searchValue ? { searchValue } : {}),
  }),
  target: fetchReviewsCountByReplyFx,
});

sample({
  clock: [homeRoute.opened, findReviews, clearReviewsSearch, setProductActive],
  source: paramsFetchReviews,
  filter: ({ productId }) => Boolean(productId),
  fn: ({ productId, searchValue }) => ({
    ...(productId ? { productId } : {}),
    ...(searchValue ? { searchValue } : {}),
  }),
  target: fetchProductReviewsCountByReplyFx,
});

sample({
  clock: [homeRoute.opened, findProducts],
  source: $productsSearch,
  fn: (searchValue) => ({ searchValue }),
  target: fetchReviewsUnreadCountFx,
});
