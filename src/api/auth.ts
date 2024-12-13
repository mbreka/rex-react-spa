// - Prijava u sustav i dohvat tokena - https://dummyjson.com/docs/auth
import { LoginResponseI, MeResponseI, RefreshResponseI } from "@/types/interfaces";
import axios from "axios";

const postLogin: (user: string, pass: string) => Promise<LoginResponseI | undefined> = async (user, pass) => {
  try {
    const response = await axios.post("https://dummyjson.com/auth/login", {
      username: user,
      password: pass,
      expiresInMins: 30, // optional, defaults to 60
    });
    const login: LoginResponseI = response.data;
    return login;
  } catch {
    return undefined;
  }
};

const getMe: (accessToken: string) => Promise<MeResponseI | undefined> = async (accessToken) => {
  try {
    const response = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
      },
    });
    const me: MeResponseI = response.data;
    return me;
  } catch {
    return undefined;
  }
};

const postRefresh: (refreshToken: string) => Promise<RefreshResponseI | undefined> = async (refreshToken) => {
  try {
    const response = await axios.post("https://dummyjson.com/auth/refresh", {
      refreshToken: refreshToken, // Optional, if not provided, the server will use the cookie
      expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
    });
    const refresh: RefreshResponseI = response.data;
    return refresh;
  } catch {
    return undefined;
  }
};

export { postLogin, getMe, postRefresh };
