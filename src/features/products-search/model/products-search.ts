import { getProductsFx } from "@entities/product";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";

export const $productsSearchValue = createStore("");

export const changeProductsSearchValue =
  createEvent<ChangeEvent<HTMLInputElement>>();

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
  fn: (e) => e.target.value,
  target: $productsSearchValue,
});

querySync({
  source: { searchProducts: $productsSearchValue },
  clock: findProducts,
  route: homeRoute,
  controls,
});
