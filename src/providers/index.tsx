import React, { FC, ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { AppProvider } from "./AppProvider";
import { BrowserRouter } from "react-router";

const GlobalProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
      <AppProvider>{children}</AppProvider>
      </BrowserRouter>
    </MantineProvider>
  );
};

export { GlobalProvider };
