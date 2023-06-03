import { Review } from "@shared/types/review";
import { useList, useUnit } from "effector-react";
import {
  $reviewList,
  fetchProductReviewsFx,
  fetchReviewsFx,
  setReviewActive,
} from "../model/review";

const ReviewListItem = ({ id, text, date, author, rating }: Review) => {
  const [setReviewActiveFn] = useUnit([setReviewActive]);

  return (
    <div onClick={() => setReviewActiveFn(id)} className="py-5 px-5">
      <div className="mb-2">{text}</div>
      <div className="flex space-x-4 text-sm">
        <div>{author}</div>
        <div>{new Date(date).toUTCString()}</div>
        <div>{rating}</div>
      </div>
    </div>
  );
};

export const ReviewList = () => {
  const [pendingReviews, pendingProductReviews] = useUnit([
    fetchReviewsFx.pending,
    fetchProductReviewsFx.pending,
  ]);

  const list = useList($reviewList, ReviewListItem);

  if (pendingReviews || pendingProductReviews) {
    return <div className="grow grid place-content-center">Loading...</div>;
  }

  return <div className="overflow-y-auto divide-y">{list}</div>;
};
