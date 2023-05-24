import { Product } from "@shared/types/product";
import { API_NAMESPACE } from "./const";

export const fetchProducts = () =>
  fetch(`/${API_NAMESPACE}/products`)
    .then((res) => res.json())
    .then(({ products }) => products as Product[]);
