import { Product } from "@shared/types/product";
import { api } from "./const";

export const fetchProducts = (searchParams?: { searchValue?: string }) =>
  api
    .get(`products`, {
      searchParams,
    })
    .json<{ products: Product[] }>()
    .then((res) => res.products);
