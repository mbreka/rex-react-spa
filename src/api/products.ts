// - Proizvode - https://dummyjson.com/products

import { ProductI, ProductsResponseI, QueryI } from "@/types/interfaces";
import axios from "axios";

const _getProducts: (query?: QueryI) => Promise<ProductsResponseI> = async (query) => {
  const params = new URLSearchParams(query as Record<string, string>);
  const response = await axios.get(`https://dummyjson.com/products/search${query ? "?" + params.toString() : ""}`);
  const products: ProductsResponseI = response.data;
  return products;
};

const _getProductsByCategory: (category?: string) => Promise<ProductsResponseI> = async (category) => {
  const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
  const products: ProductsResponseI = response.data;
  return products;
};

const getProductWrapperForFilterByCategory: (query?: QueryI) => Promise<ProductsResponseI> = async (query) => {
  const queryWithoutCategories = { ...query };
  delete queryWithoutCategories.categories;

  if (query?.categories === undefined || query?.categories?.length === 0) {
    return _getProducts(queryWithoutCategories);
  }

  let allProductList: ProductI[] = [];

  for (const slug of query.categories) {
    allProductList.push(...(await _getProductsByCategory(slug)).products);
  }

  const order = query.order ?? "asc";
  if (query.sortBy == "title") {
    allProductList = allProductList.sort((a, b) =>
      order === "asc" ? (a.title > b.title ? -1 : 1) : a.title < b.title ? -1 : 1,
    );
  }
  if (query.sortBy == "price") {
    allProductList = allProductList.sort((a, b) =>
      order === "asc" ? (a.price < b.price ? -1 : 1) : a.price > b.price ? -1 : 1,
    );
  }

  return {
    total: allProductList.length,
    skip: query.skip,
    limit: query.limit,
    products: allProductList.splice(query.skip || 0, query.limit || 20),
  } as ProductsResponseI;
};

export { getProductWrapperForFilterByCategory as getProducts };
