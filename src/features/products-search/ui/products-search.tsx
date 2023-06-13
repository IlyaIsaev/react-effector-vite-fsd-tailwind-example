import { Input } from "@shared/ui-kit/input";
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

  return (
    <Input
      value={value}
      onChange={changeValue}
      onClear={clearValue}
      onSearch={findProductsFn}
    />
  );
};
