import "@testing-library/jest-dom";
import { categories } from "../../src/api";

test("categories endpoints", async () => {
  const resCategories = await categories();
  // console.log(resCategories);
  expect(resCategories).not.toBeFalsy();
  expect(resCategories.length).not.toBeFalsy();
});
