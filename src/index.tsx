import React from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./providers";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import { AppLayout } from "./components/AppLayout";

const container = document.getElementById("app");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppLayout />
    </GlobalProvider>
  </React.StrictMode>,
);

export { root };
