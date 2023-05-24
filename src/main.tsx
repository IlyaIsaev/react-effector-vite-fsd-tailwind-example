import { App } from "@app/app";
import { history, router } from "@app/routing.js";
// import { attachLogger } from "effector-logger";
import React from "react";
import ReactDOM from "react-dom/client";
import "./app/global.css";
import "./mock-server.js";

// attachLogger();

router.setHistory(history);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
