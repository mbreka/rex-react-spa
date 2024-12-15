import "@testing-library/jest-dom";
import { postLogin, getMe, postRefresh } from "../../src/api";

test("auth endpoints", async () => {
  const resLogin = await postLogin("emilys", "emilyspass");
  // console.log(resLogin);
  expect(resLogin).not.toBeFalsy();

  const resMe = await getMe(resLogin.accessToken);
  // console.log(resMe);
  expect(resMe).not.toBeFalsy();

  const resRefresh = await postRefresh(resLogin.refreshToken);
  // console.log(resRefresh);
  expect(resRefresh).not.toBeFalsy();
});
