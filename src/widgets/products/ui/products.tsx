import { ProductList } from "@entities/product";
import { SelectAllProducts } from "@features/select-all-products";

export const Products = () => {
  return (
    <div className="flex flex-col justify-stretch h-screen">
      <SelectAllProducts />
      <ProductList />
    </div>
  );
};
