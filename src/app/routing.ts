import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { homeRoute } from "src/shared/routes";

const routes = [{ path: "/", route: homeRoute }];

export const router = createHistoryRouter({
  routes: routes,
});

export const history = createBrowserHistory();
