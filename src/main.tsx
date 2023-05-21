import React from "react";
import { attachLogger } from "effector-logger";
import ReactDOM from "react-dom/client";
import "./app/global.css";
import { App } from "@app/app";

attachLogger();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
