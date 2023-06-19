import { fetchProducts } from "@shared/api/fetch-products";
import { controls, homeRoute } from "@shared/routes";
import { Product } from "@shared/types/product";
import { querySync } from "atomic-router";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const getProductsFx = createEffect(fetchProducts);

export const $productList = restore(getProductsFx, []);

export const $activeProductId = createStore<Product["id"] | null>(null);

export const setProductActive = createEvent<string | null>();

querySync({
  source: {
    product: $activeProductId,
  },
  route: homeRoute,
  controls,
});

sample({
  clock: setProductActive,
  target: $activeProductId,
});

sample({
  clock: homeRoute.opened,
  fn: (clockData) => clockData?.query.product || null,
  target: setProductActive,
});
