import { Product } from "@shared/types/product";
import { api } from "./const";

type SearchParams = {
  searchValue?: string;
};

const getSearchParams = ({ searchValue }: SearchParams) => ({
  ...(searchValue ? { searchValue } : {}),
});

const getParams = (searchParams?: SearchParams) => ({
  searchParams:
    searchParams && Object.keys(searchParams)
      ? getSearchParams(searchParams)
      : undefined,
});

export const fetchProducts = (searchParams?: SearchParams) =>
  api
    .get(`products`, getParams(searchParams))
    .json<{ products: Product[] }>()
    .then((res) => res.products);
