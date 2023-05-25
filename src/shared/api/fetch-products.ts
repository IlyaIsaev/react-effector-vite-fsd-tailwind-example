import { Product } from "@shared/types/product";
import { API_NAMESPACE } from "./const";

export type FetchProductsInput = {
  searchValue?: string;
};

export const fetchProducts = (input?: FetchProductsInput) => {
  const params = input ? new URLSearchParams(input) : undefined;

  return fetch(`/${API_NAMESPACE}/products${params ? `?${params}` : ""}`)
    .then((res) => res.json())
    .then(({ products }) => products as Product[]);
};
