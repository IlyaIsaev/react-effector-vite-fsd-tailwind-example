import { ProductList } from "@entities/product";
import { SearchProducts } from "@features/search-products";
import { SelectAllProducts } from "@features/select-all-products";
import { SelectReviewsByReply } from "@features/select-revierws-by-reply";

export const Products = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-stretch h-full">
        <SearchProducts />
        <SelectAllProducts />
        <ProductList />
      </div>

      <div className="grow">
        <SelectReviewsByReply />
      </div>
    </div>
  );
};
