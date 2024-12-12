// - Kategorije - https://dummyjson.com/products/categories

import { CategoriesResponseI } from "@/types/interfaces";
import axios from "axios";

const categories: () => Promise<CategoriesResponseI> = async () => {
  const response = await axios.get(`https://dummyjson.com/products/categories`);
  const categories: CategoriesResponseI = response.data;
  return categories;
};

export { categories };
