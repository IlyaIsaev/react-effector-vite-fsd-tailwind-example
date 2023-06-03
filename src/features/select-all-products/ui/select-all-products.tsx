import clsx from "clsx";
import { useUnit } from "effector-react";
import {
  $reviewsCount,
  $isSelectAllProductsActive,
  fetchReviewsUnreadCountFx,
  setSelectAllProductsActive,
} from "../model/select-all-products";

export const SelectAllProducts = () => {
  const [{ reviewsCount, unreadReviewsCount }, isActive, setIsActive, isLoading] =
    useUnit([
      $reviewsCount,
      $isSelectAllProductsActive,
      setSelectAllProductsActive,
      fetchReviewsUnreadCountFx.pending,
    ]);

  return (
    <div
      className={clsx(
        "w-80 h-16 px-4 shrink-0 cursor-pointer border-r border-b",
        isActive && "bg-slate-200"
      )}
      onClick={() => setIsActive(true)}
    >
      {isLoading && (
        <div className="h-full flex justify-center items-center">
          Loading ...
        </div>
      )}

      {!isLoading && (
        <div className="h-full flex justify-between items-center">
          <div className="font-bold truncate">Select all products</div>
          <div className="flex justify-end">
            <div className="text-slate-400">{reviewsCount}</div>
            &nbsp;
            <div>{unreadReviewsCount}</div>
          </div>
        </div>
      )}
    </div>
  );
};
