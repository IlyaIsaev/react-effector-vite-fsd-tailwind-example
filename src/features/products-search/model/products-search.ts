import { getProductsFx } from "@entities/product";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEvent, createStore, sample } from "effector";

export const $productsSearch = createStore("");

export const changeProductsSearch = createEvent<string>();

export const clearProductsSearch = createEvent();

export const findProducts = createEvent();

sample({
  clock: clearProductsSearch,
  fn: () => "",
  target: [$productsSearch, findProducts],
});

sample({
  clock: changeProductsSearch,
  target: $productsSearch,
});

querySync({
  source: { productsSearch: $productsSearch },
  clock: findProducts,
  route: homeRoute,
  controls,
});

sample({
  clock: homeRoute.opened,
  fn: (clockData) => clockData?.query.productsSearch || "",
  target: $productsSearch,
});

sample({
  clock: [homeRoute.opened, findProducts],
  source: $productsSearch,
  fn: (searchValue) => ({
    searchValue,
  }),
  target: getProductsFx,
});
