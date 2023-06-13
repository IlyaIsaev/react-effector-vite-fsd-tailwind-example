import {Product} from "@shared/types/product";
import {clsx} from "clsx";
import {useList, useStoreMap, useUnit} from "effector-react";
import {
  $activeProductId,
  $productList,
  getProductsFx,
  setProductActive
} from "../model/product";

const ProductListItem = ({
  id,
  name,
  reviewsNumber,
  unreadReviewsNumber,
}: Product) => {
  const [setProductActiveFn] = useUnit([setProductActive]);

  const isActive = useStoreMap({
    store: $activeProductId,
    keys: [id],
    fn: (activeProductId, [productId]) => activeProductId === productId,
  });

  return (
    <div
      className={clsx(
        "h-16 px-4 flex justify-between items-center cursor-pointer",
        isActive && "bg-slate-100"
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
    <div className="w-80 border-r divide-y overflow-y-auto grow">
      {pending && (
        <div className="w-full h-full grid place-content-center">
          Loading ...
        </div>
      )}

      {useList($productList, ProductListItem)}
    </div>
  );
};
