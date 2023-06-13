import { Review } from "@shared/types/review";
import { useList, useUnit } from "effector-react";
import {
  $reviewList,
  fetchProductReviewsFx,
  fetchReviewsFx,
  setActiveReview,
} from "../model/review";
import clsx from "clsx";

const ReviewListItem = ({ id, text, date, author, read }: Review) => {
  const [setReviewActiveFn] = useUnit([setActiveReview]);

  return (
    <div
      onClick={() => setReviewActiveFn(id)}
      className={clsx(
        "py-5 px-5 relative cursor-pointer",
        !read &&
          "before:block before:absolute before:left-2 before:top-7 before:w-1.5 before:h-1.5 before:bg-slate-500 before:rounded-full"
      )}
    >
      <div className="mb-2 line-clamp-2">{text}</div>
      <div className="flex space-x-4 text-sm">
        <div>{author}</div>
        <div>{new Date(date).toUTCString()}</div>
      </div>
    </div>
  );
};

const EmptyPlaceholder = () => (
  <div className="grid place-content-center h-full">Nothing has been found</div>
);

export const ReviewList = () => {
  const [pendingReviews, pendingProductReviews] = useUnit([
    fetchReviewsFx.pending,
    fetchProductReviewsFx.pending,
  ]);

  const list = useList($reviewList, {
    fn: ReviewListItem,
    placeholder: <EmptyPlaceholder />,
  });

  if (pendingReviews || pendingProductReviews) {
    return <div className="grow grid place-content-center">Loading...</div>;
  }

  return <div className="overflow-y-auto divide-y grow">{list}</div>;
};
