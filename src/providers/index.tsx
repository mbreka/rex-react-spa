import React, { FC, ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { AppProvider } from "./AppProvider";

const GlobalProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return (
    <MantineProvider theme={theme}>
      <AppProvider>{children}</AppProvider>
    </MantineProvider>
  );
};

export { GlobalProvider };
