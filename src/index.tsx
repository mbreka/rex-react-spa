import React from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./providers";
import { App } from "@/components/App";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import { AppLayout } from "./components/AppLayout";

const container = document.getElementById("app");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
      <AppLayout />
    </GlobalProvider>
  </React.StrictMode>,
);

export { root };
