import { HomePage } from "@pages/home-page";
import { homeRoute } from "@shared/routes";
import { router } from "./routing";
import { Route, RouterProvider } from "atomic-router-react";

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={HomePage} />
    </RouterProvider>
  );
};
