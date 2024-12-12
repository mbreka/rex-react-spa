// - Proizvode - https://dummyjson.com/products

import { ProductsResponseI, QueryI } from "@/types/interfaces";
import axios from "axios";

const getProducts: (query?: QueryI) => Promise<ProductsResponseI> = async (query) => {
  const params = new URLSearchParams(query as Record<string, string>);
  const response = await axios.get(`https://dummyjson.com/products${query ? "?" + params.toString() : ""}`);
  const products: ProductsResponseI = response.data;
  return products;
};

export { getProducts };
