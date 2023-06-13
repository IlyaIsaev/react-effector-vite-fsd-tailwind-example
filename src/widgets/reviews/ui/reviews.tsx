import { ProductList } from "@entities/product";
import { ReviewList } from "@entities/review";
import { ReviewsSearch } from "@features/reviews-search";
import { ProductsSearch } from "@features/products-search";
import { ProductsSelectAll } from "@features/products-select-all";
import { ReviewsSelectByReply } from "@features/reviews-select-by-reply";
import "../model/reviews";

export const Reviews = () => {
  return (
    <div className="flex h-screen">
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
  );
};
