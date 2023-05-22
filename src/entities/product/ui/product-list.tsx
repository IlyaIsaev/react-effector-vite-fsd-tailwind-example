import { useList, useUnit } from "effector-react";
import { clsx } from "clsx";
import { Product } from "@shared/types/product";
import {
  $activeProduct,
  $productList,
  getProductsFx,
  setProductActive,
} from "../model/product";

const ProductListItem = ({
  id,
  name,
  reviewsNumber,
  unreadReviewsNumber,
}: Product) => {
  const [activeProduct, setProductActiveFn] = useUnit([
    $activeProduct,
    setProductActive,
  ]);

  const isActive = activeProduct?.id === id;

  return (
    <div
      className={clsx(
        "h-16 px-4 flex justify-between items-center cursor-pointer",
        isActive && "bg-slate-200"
      )}
      onClick={() => setProductActiveFn(id)}
    >
      <div className="font-bold truncate">{name}</div>
      <div className="flex justify-end">
        <div className="text-slate-400">{reviewsNumber}</div>
        &nbsp;
        <div>{unreadReviewsNumber}</div>
      </div>
    </div>
  );
};

export const ProductList = () => {
  const [pending] = useUnit([getProductsFx.pending]);

  return (
    <div className="w-80 border-r divide-y h-screen overflow-y-auto">
      {pending && (
        <div className="w-full h-full grid place-content-center">
          Loading ...
        </div>
      )}

      {useList($productList, ProductListItem)}
    </div>
  );
};
