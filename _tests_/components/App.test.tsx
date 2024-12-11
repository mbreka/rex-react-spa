import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../../src/components/App";

test("loads and displays app", async () => {
  // ARRANGE
  render(<App />);

  // ACT
  await userEvent.click(screen.getByText("learn react"));
  // await screen.findByRole('heading')

  // ASSERT
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toBeDisabled()
});
