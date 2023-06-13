import { getProductsFx } from "@entities/product";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEvent, createStore, sample } from "effector";

export const $productsSearchValue = createStore("");

export const changeProductsSearchValue = createEvent<string>();

export const clearProductsSearchValue = createEvent();

export const findProducts = createEvent();

sample({
  clock: findProducts,
  source: $productsSearchValue,
  fn: (searchValue) => ({
    searchValue,
  }),
  target: getProductsFx,
});

sample({
  clock: clearProductsSearchValue,
  fn: () => "",
  target: [$productsSearchValue, findProducts],
});

sample({
  clock: changeProductsSearchValue,
  target: $productsSearchValue,
});

querySync({
  source: { productsSearch: $productsSearchValue },
  clock: findProducts,
  route: homeRoute,
  controls,
});
