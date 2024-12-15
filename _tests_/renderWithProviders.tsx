import React from "react";
import { GlobalProvider } from "../src/providers";

import { render, screen } from "@testing-library/react";
const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <GlobalProvider {...providerProps}>
{ui}
    </GlobalProvider>,
    renderOptions,
  );
};

export {renderWithProviders }