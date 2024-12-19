// - Proizvode - https://dummyjson.com/products

import { ProductI, ProductsResponseI, QueryI } from "@/types/interfaces";
import axios from "axios";

const _getProducts: (query?: QueryI) => Promise<ProductsResponseI> = async (query) => {
  const params = new URLSearchParams(query as Record<string, string>);
  const response = await axios.get(`https://dummyjson.com/products/search${query ? "?" + params.toString() : ""}`);
  const products: ProductsResponseI = response.data;
  return products;
};

// Useless because it has no pagination / order / filter
const _getProductsByCategory: (category?: string) => Promise<ProductsResponseI> = async (category) => {
  const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
  const products: ProductsResponseI = response.data;
  return products;
};

const _getAllProducts: () => Promise<ProductsResponseI> = async () => {
  const limit = 100;
  const firstProducts = await _getProducts({ limit });

  let allProductList: ProductI[] = [];
  allProductList.push(...firstProducts.products);

  for (let i = 1; i < Math.ceil((firstProducts.total || 0) / limit); i++) {
    const skip = i * limit;
    const otherProducts = await _getProducts({ limit, skip });
    allProductList.push(...otherProducts.products);
  }

  return {
    skip: 0,
    limit: allProductList.length,
    total: allProductList.length,
    products: allProductList,
  };
};

const getProductWrapperForFilterByCategoryOrPrice: (
  query?: QueryI,
// ) => Promise<[ProductsResponseI, [number, number]]> = async (query = {}) => {
) => Promise<ProductsResponseI> = async (query = {}) => {
  const queryWithoutCategories = { ...query };
  delete queryWithoutCategories.categories;
  delete queryWithoutCategories.priceRange;

  // Supported by dummyjson
  // if (query?.categories === undefined || query?.categories?.length === 0) {
  //   return _getProducts(queryWithoutCategories);
  // }
  // Useless since most required functionalities are not achievable

  // Not supported by dummyjson (categories, price range)
  const allProducts = await _getAllProducts();

  let allProductList: ProductI[] = allProducts.products;

  // Filtering
  if (query.categories !== undefined && query.categories.length > 0) {
    allProductList = allProductList.filter((p) => query.categories!.includes(p.category));
  }

  if (query.q !== undefined) {
    allProductList = allProductList.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(query.q!.toLocaleLowerCase()) ||
        p.description.toLocaleLowerCase().includes(query.q!.toLocaleLowerCase()),
    );
  }

  let min = 0;
  let max = 1;
  try {
    min = Math.floor(allProductList.reduce((prev, curr) => (prev.price < curr.price ? prev : curr)).price);
    max = Math.ceil(allProductList.reduce((prev, curr) => (prev.price > curr.price ? prev : curr)).price);
  } catch {}

  if (query.priceRange !== undefined) {
    allProductList = allProductList.filter((p) => p.price > query.priceRange![0] && query.priceRange![1] > p.price);
  }

  // Ordering
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

  // Pagination + min and max price
  return {
    total: allProductList.length,
    skip: query.skip,
    limit: query.limit,
    products: allProductList.splice(query.skip || 0, query.limit || 20),
  };

  // return [
  //   {
  //     total: allProductList.length,
  //     skip: query.skip,
  //     limit: query.limit,
  //     products: allProductList.splice(query.skip || 0, query.limit || 20),
  //   },
  //   [min, max],
  // ];
};

export { getProductWrapperForFilterByCategoryOrPrice as getProducts };
