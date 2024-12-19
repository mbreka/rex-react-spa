import "@testing-library/jest-dom";
import { getProducts } from "../../src/api";

test("products endpoints", async () => {
  const resProducts = await getProducts();
  // console.log(resProducts);
  expect(resProducts).not.toBeFalsy();
});
