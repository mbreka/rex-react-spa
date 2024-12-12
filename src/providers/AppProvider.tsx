import { getProducts } from "@/api";
import { ProductModal } from "@/components/ProductModal";
import { ProductI, QueryI, UserI } from "@/types/interfaces";
import React, { FC, ReactNode } from "react";

export type AppContextType = {
  products: ProductI[];
  selected: ProductI | undefined;
  cart: ProductI[];
  user: UserI | undefined;
  setSelected: (product: ProductI | undefined) => void;
  queryProducts: (query: QueryI) => void;
  addProductToCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  login: () => void;
  logout: () => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const [products, setProducts] = React.useState<ProductI[]>([]);
  const [selected, setSelected] = React.useState<ProductI>();
  const [cart, setCart] = React.useState<ProductI[]>([]);
  const [user, setUser] = React.useState<UserI>();

  const queryProducts = (query: QueryI) => {
    getProducts(query).then(({products})=>{
      setProducts(products)
    })
  };
  const addProductToCart = (productId: string) => {};
  const removeProductFromCart = (productId: string) => {};
  const login = () => {};
  const logout = () => {};

  return (
    <AppContext.Provider
      value={{
        products,
        selected,
        cart,
        user,
        setSelected,
        queryProducts,
        addProductToCart,
        removeProductFromCart,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
