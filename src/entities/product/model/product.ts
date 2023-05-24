import { fetchProducts } from "@shared/api/fetch-products";
import { homeRoute } from "@shared/routes";
import { Product } from "@shared/types/product";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const getProductsFx = createEffect(async () => fetchProducts());

export const $productList = restore(getProductsFx, []);

export const $activeProduct = createStore<Product | null>(null);

export const setProductActive = createEvent<string | null>();

sample({
  clock: setProductActive,
  source: $productList,
  fn: (productList, id) =>
    productList.find((product) => product.id === id) || null,
  target: $activeProduct,
});

sample({
  clock: homeRoute.opened,
  target: getProductsFx,
});
