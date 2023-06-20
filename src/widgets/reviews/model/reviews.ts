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
import { FetchProductReviews } from "@shared/api/fetch-product-reviews";
import { FetchProductReviewsCountByReply } from "@shared/api/fetch-product-reviews-count-by-reply";
import { homeRoute } from "@shared/routes";
import { sample } from "effector";
import { debug } from "patronum";

const fetchReviewsEvent = sample({
  clock: [
    homeRoute.opened,
    findReviews,
    clearReviewsSearch,
    setProductActive,
    selectReviewsByReply,
    closeReviewCard,
    findProducts,
  ],
});

const paramsFetchReviews = sample({
  source: [
    $reviewsSearch,
    $replyReviewsSelected,
    $activeProductId,
    $productsSearch,
  ],
  fn: ([
    reviewsSearch,
    replyReviewsSelected,
    activeProductId,
    productsSearch,
  ]) => ({
    ...(reviewsSearch ? { searchValue: reviewsSearch } : {}),
    ...(replyReviewsSelected
      ? { hasReply: replyReviewsSelected === "withReply" }
      : {}),
    ...(activeProductId ? { productId: activeProductId } : {}),
    ...(productsSearch ? { productsSearch } : {}),
  }),
});

debug(paramsFetchReviews);

sample({
  clock: fetchReviewsEvent,
  source: paramsFetchReviews,
  filter: ({ productId }) => Boolean(productId),
  fn: (params) => params as FetchProductReviews,
  target: fetchProductReviewsFx,
});

sample({
  clock: fetchReviewsEvent,
  source: paramsFetchReviews,
  filter: ({ productId }) => !productId,
  target: fetchReviewsFx,
});

sample({
  clock: [homeRoute.opened, findReviews, clearReviewsSearch, setProductActive],
  source: paramsFetchReviews,
  filter: ({ productId }) => !productId,
  target: fetchReviewsCountByReplyFx,
});

sample({
  clock: [homeRoute.opened, findReviews, clearReviewsSearch, setProductActive],
  source: paramsFetchReviews,
  filter: ({ productId }) => Boolean(productId),
  fn: (params) => params as FetchProductReviewsCountByReply,
  target: fetchProductReviewsCountByReplyFx,
});

sample({
  clock: [homeRoute.opened, findProducts],
  source: $productsSearch,
  fn: (searchValue) => ({ searchValue }),
  target: fetchReviewsUnreadCountFx,
});
