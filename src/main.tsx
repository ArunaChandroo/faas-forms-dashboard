import React from "react";
import ReactDOM from "react-dom/client";
import { ModusWcThemeProvider } from "../Modus components";
import App from "./App";
import "./index.css";

/** Lock UI to light mode; Modus theme store respects `preferred-mode` so OS dark does not override. */
if (typeof window !== "undefined") {
  localStorage.setItem("preferred-mode", "light");
  try {
    localStorage.setItem(
      "modus-theme-config",
      JSON.stringify({ mode: "light", theme: "modus-modern" }),
    );
  } catch {
    /* ignore quota / private mode */
  }
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ModusWcThemeProvider initialTheme={{ mode: "light", theme: "modus-modern" }}>
      <App />
    </ModusWcThemeProvider>
  </React.StrictMode>,
);
