import { getProductsFx } from "@entities/product";
import { controls, homeRoute } from "@shared/routes";
import { querySync } from "atomic-router";
import { createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";

export const $searchProductsValue = createStore("");

export const changeSearchProductsValue =
  createEvent<ChangeEvent<HTMLInputElement>>();

export const clearSearchProductsValue = createEvent();

export const findBySearchProductsValue = createEvent();

querySync({
  source: { searchProducts: $searchProductsValue },
  clock: findBySearchProductsValue,
  route: homeRoute,
  controls,
});

sample({
  clock: findBySearchProductsValue,
  source: $searchProductsValue,
  fn: (searchValue) => ({
    searchValue,
  }),
  target: getProductsFx,
});

sample({
  clock: clearSearchProductsValue,
  fn: () => "",
  target: [$searchProductsValue, findBySearchProductsValue],
});

sample({
  clock: changeSearchProductsValue,
  fn: (e) => e.target.value,
  target: $searchProductsValue,
});
