import React, { FC, ReactNode, useEffect } from "react";
import { getMe, getProducts, postLogin, postRefresh } from "@/api";
import { ProductModal } from "@/components/ProductModal";
import { LoginResponseI, ProductI, QueryI, UserI } from "@/types/interfaces";
import { useLocalStorage } from "@mantine/hooks";

export type AppContextType = {
  products: ProductI[];
  selected: ProductI | undefined;
  cart: ProductI[];
  user: UserI | undefined;
  totalProducts: number;
  loading: boolean;
  setSelected: (product: ProductI | undefined) => void;
  queryProducts: (query: QueryI) => void;
  addProductToCart: (product: ProductI) => void;
  removeProductFromCart: (product: ProductI) => void;
  login: (user: string, pass: string) => void;
  logout: () => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const [auth, setAuth] = useLocalStorage<LoginResponseI | undefined>({
    key: "auth",
    defaultValue: undefined,
  });
  const [cart, setCart] = useLocalStorage<ProductI[]>({
    key: "cart",
    defaultValue: [],
  });

  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<ProductI[]>([]);
  const [selected, setSelected] = React.useState<ProductI>();
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [user, setUser] = React.useState<UserI>();

  const queryProducts = (query: QueryI | undefined) => {
    setLoading(true);
    getProducts(query)
      .then(({ products, total }): void => {
        setProducts(products);
        setTotalProducts(total || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const addProductToCart = (product: ProductI) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  const removeProductFromCart = (product: ProductI) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };
  const login = (user: string, pass: string) => {
    setLoading(true);
    postLogin(user, pass)
      .then((_auth) => {
        if (!_auth) {
          setLoading(false);
          return;
        }
        setAuth(_auth);
        getMe(_auth.accessToken)
          .then((_user) => {
            setUser(_user);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setAuth(undefined);
    setUser(undefined);
  };

  const refreshToken = (auth: LoginResponseI) => {
    setLoading(true);
    postRefresh(auth.refreshToken).then((_auth) => {
      if (!_auth) {
        return;
      }
      setAuth({ ...auth, accessToken: _auth?.accessToken, refreshToken: _auth.refreshToken });
      getMe(_auth.accessToken).then((_user) => {
        setUser(_user);
        setLoading(false);
      });
    });
  }

  useEffect(() => {
    if (!auth) {
      return;
    }
    setLoading(true);
    getMe(auth.accessToken).then((_user) => {
      if (!_user) {
        refreshToken(auth);
        return;
      }
      setUser(_user);
      setLoading(false);
    });
  }, [auth]);

  return (
    <AppContext.Provider
      value={{
        products,
        selected,
        cart,
        user,
        totalProducts,
        loading,
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
