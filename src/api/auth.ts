// - Prijava u sustav i dohvat tokena - https://dummyjson.com/docs/auth
import { LoginResponseI, MeResponseI, RefreshResponseI } from "@/types/interfaces";
import axios from "axios";

const login: () => Promise<LoginResponseI> = async () => {
  const response = await axios.post("https://dummyjson.com/auth/login", {
    username: "emilys",
    password: "emilyspass",
    expiresInMins: 30, // optional, defaults to 60
  });
  const login: LoginResponseI = response.data;
  return login;
};

const me: (accessToken: string) => Promise<MeResponseI> = async (accessToken) => {
  const response = await axios.get("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
    },
  });
  const me: MeResponseI = response.data;
  return me;
};

const refresh: (refreshToken: string) => Promise<RefreshResponseI> = async (refreshToken) => {
  const response = await axios.post("https://dummyjson.com/auth/refresh", {
    refreshToken: refreshToken, // Optional, if not provided, the server will use the cookie
    expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
  });
  const refresh: RefreshResponseI = response.data;
  return refresh;
};

export { login, me, refresh };
