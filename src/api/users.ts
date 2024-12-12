// - Podaci o korisnicima sustava - w

import { QueryI, UsersResponseI } from "@/types/interfaces";
import axios from "axios";

const users: (query?: QueryI) => Promise<UsersResponseI> = async (query) => {
  const params = new URLSearchParams(query as Record<string, string>);
  const response = await axios.get(`https://dummyjson.com/users${query ? "?" + params.toString() : ""}`);
  const users: UsersResponseI = response.data;
  return users;
};

export { users };
