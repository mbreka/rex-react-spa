import "@testing-library/jest-dom";
import { users } from "../../src/api";

test("users endpoints", async () => {
  const resUsers = await users();
  // console.log(resUsers);
  expect(resUsers).not.toBeFalsy();
});
