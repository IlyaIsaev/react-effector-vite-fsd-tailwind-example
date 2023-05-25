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

export const $activeProduct = createStore<Product | null>(null);

export const setProductActive = createEvent<string | null>();

const $activeProductId = createStore<Product["id"] | null>(null);

sample({
  clock: $activeProduct,
  fn: (product) => product?.id || null,
  target: $activeProductId,
});

// TODO: finish when have a real server, not mocked
// sample({
// clock: $activeProductId,
// source: [$productList, $activeProduct],
// fn: ([products, activeProduct], id) => {
// console.log({ products, activeProduct });

// return products.find((product) => product.id === id) || null;
// },
// filter: ([_products, activeProduct], id) => {
// console.log({ activeProduct, id });

// return activeProduct?.id !== id;
// },
// target: $activeProduct,
// });

querySync({
  source: {
    product: sample({
      source: $activeProduct,
      fn: (product) => product?.id || null,
    }),
  },
  route: homeRoute,
  controls,
});

sample({
  clock: setProductActive,
  source: $productList,
  fn: (productList, id) =>
    productList.find((product) => product.id === id) || null,
  target: $activeProduct,
});

sample({
  clock: homeRoute.opened,
  fn: () => undefined,
  target: getProductsFx,
});
