import "@testing-library/jest-dom";
import { login, me, refresh } from "../../src/api";

test("auth endpoints", async () => {
  const resLogin = await login();
  // console.log(resLogin);
  expect(resLogin).not.toBeFalsy();

  const resMe = await me(resLogin.accessToken);
  // console.log(resMe);
  expect(resMe).not.toBeFalsy();

  const resRefresh = await refresh(resLogin.refreshToken);
  // console.log(resRefresh);
  expect(resRefresh).not.toBeFalsy();
});
