import { KeyboardEvent } from "react";
import { useUnit } from "effector-react";
import {
  $productsSearchValue,
  changeProductsSearchValue,
  clearProductsSearchValue,
  findProducts,
} from "../model/products-search";

export const ProductsSearch = () => {
  const [value, changeValue, clearValue, findProductsFn] = useUnit([
    $productsSearchValue,
    changeProductsSearchValue,
    clearProductsSearchValue,
    findProducts,
  ]);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      findProductsFn();
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-r w-80">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={changeValue}
          onKeyUp={handleKeyUp}
          className="h-10 border px-4"
        />

        {Boolean(value.length) && (
          <div
            onClick={clearValue}
            className="w-10 h-full border flex justify-center items-center cursor-pointer absolute right-0 top-0 "
          >
            x
          </div>
        )}
      </div>
      <div className="grow flex justify-center items-center">
        <button onClick={findProductsFn} className="bg-slate-300 p-2">
          Search
        </button>
      </div>
    </div>
  );
};
