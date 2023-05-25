import { App } from "@app/app";
import { history, router } from "@app/routing.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "./app/global.css";
import "./mock-server.js";

router.setHistory(history);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
