import "@testing-library/jest-dom";
import { getCategories } from "../../src/api";

test("categories endpoints", async () => {
  const resCategories = await getCategories();
  // console.log(resCategories);
  expect(resCategories).not.toBeFalsy();
  expect(resCategories.length).not.toBeFalsy();
});
