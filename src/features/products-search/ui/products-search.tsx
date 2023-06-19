import { Input } from "@shared/ui-kit/input";
import { useUnit } from "effector-react";
import {
  $productsSearch,
  changeProductsSearch,
  clearProductsSearch,
  findProducts,
} from "../model/products-search";

export const ProductsSearch = () => {
  const [value, changeValue, clearValue, findProductsFn] = useUnit([
    $productsSearch,
    changeProductsSearch,
    clearProductsSearch,
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
