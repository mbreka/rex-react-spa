import React, { FC, ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";

const GlobalProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export { GlobalProvider };
