import { KeyboardEvent } from "react";
import { useUnit } from "effector-react";
import {
  $searchProductsValue,
  changeSearchProductsValue,
  clearSearchProductsValue,
  findBySearchProductsValue,
} from "../model/search-products";

export const SearchProducts = () => {
  const [value, changeValue, clearValue, findProducts] = useUnit([
    $searchProductsValue,
    changeSearchProductsValue,
    clearSearchProductsValue,
    findBySearchProductsValue,
  ]);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      findProducts();
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
        <button onClick={findProducts} className="bg-slate-200 p-2">
          Search
        </button>
      </div>
    </div>
  );
};
