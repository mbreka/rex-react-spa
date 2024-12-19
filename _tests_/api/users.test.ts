import "@testing-library/jest-dom";
import { getUsers } from "../../src/api";

test("users endpoints", async () => {
  const resUsers = await getUsers();
  // console.log(resUsers);
  expect(resUsers).not.toBeFalsy();
});
