import { Input } from "@shared/ui-kit/input";
import {
  $reviewsSearch,
  changeReviewsSearch,
  clearReviewsSearch,
  findReviews,
} from "../model/reviews-search";
import { useUnit } from "effector-react";

export const ReviewsSearch = () => {
  const [value, changeValue, clearValue, findProductsFn] = useUnit([
    $reviewsSearch,
    changeReviewsSearch,
    clearReviewsSearch,
    findReviews,
  ]);

  return (
    <Input
      value={value}
      onChange={changeValue}
      onClear={clearValue}
      onSearch={findProductsFn}
    />
  );
};
