import {ProductList} from "@entities/product";
import {SearchProducts} from "@features/search-products";
import {SelectAllProducts} from "@features/select-all-products";

export const Products = () => {
  return (
    <div className="flex flex-col justify-stretch h-screen">
      <SearchProducts />
      <SelectAllProducts />
      <ProductList />
    </div>
  );
};
