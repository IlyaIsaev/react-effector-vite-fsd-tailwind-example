import { ProductList } from "@entities/product";
import { $activeReviewId, ReviewCard, ReviewList } from "@entities/review";
import { ReviewsSearch } from "@features/reviews-search";
import { ProductsSearch } from "@features/products-search";
import { ProductsSelectAll } from "@features/products-select-all";
import { ReviewsSelectByReply } from "@features/reviews-select-by-reply";
import "../model/reviews";
import { useStoreMap } from "effector-react";
import clsx from "clsx";

export const Reviews = () => {
  const isReviewCardOpen = useStoreMap($activeReviewId, (activeReviewId) =>
    Boolean(activeReviewId)
  );

  return (
    <>
      <div className={clsx("flex h-screen", isReviewCardOpen && "blur-sm")}>
        <div className="flex flex-col justify-stretch h-full">
          <ProductsSearch />
          <ProductsSelectAll />
          <ProductList />
        </div>

        <div className="grow flex flex-col">
          <div className="flex border-b justify-between items-center">
            <ReviewsSelectByReply />
            <ReviewsSearch />
          </div>
          <ReviewList />
        </div>
      </div>

      <ReviewCard />
    </>
  );
};
