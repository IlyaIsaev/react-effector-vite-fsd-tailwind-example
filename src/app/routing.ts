import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { controls, homeRoute } from "src/shared/routes";

const routes = [{ path: "/", route: homeRoute }];

export const router = createHistoryRouter({
  routes: routes,
  controls,
});

export const history = createBrowserHistory();
