import "@testing-library/jest-dom";
import { products } from "../../src/api";

test("products endpoints", async () => {
  const resProducts = await products();
  // console.log(resProducts);
  expect(resProducts).not.toBeFalsy();
});
