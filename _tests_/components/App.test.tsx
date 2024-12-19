import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { App } from "../../src/components/App";
import { renderWithProviders } from "../renderWithProviders";

test("loads and displays app", async () => {
  // ARRANGE
  renderWithProviders(<App />, { providerProps: {} });

  // ACT
  await userEvent.click(screen.getByText("Search products:"));
  // await screen.findByRole('heading')

  // ASSERT
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toBeDisabled()
});
