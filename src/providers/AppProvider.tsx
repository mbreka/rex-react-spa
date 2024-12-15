import React, { FC, ReactNode, createContext, useEffect, useState } from "react";
import { getCategories, getMe, getProducts, getUsers, postLogin, postRefresh } from "@/api";
import { CartMeta, CategoryI, LoginResponseI, ProductI, QueryI, UserI } from "@/types/interfaces";
import { useLocalStorage } from "@mantine/hooks";

export type AppContextType = {
  products: ProductI[];
  selected: ProductI | undefined;
  cart: CartMeta<ProductI>[];
  user: UserI | undefined;
  users: UserI[];
  categories: CategoryI[];
  totalProducts: number;
  loading: boolean;
  getProductCartMeta: (product: ProductI) => CartMeta<ProductI>;
  setSelected: (product: ProductI | undefined) => void;
  queryProducts: (query: QueryI) => void;
  addProductToCart: (product: CartMeta<ProductI>) => void;
  removeProductFromCart: (product: CartMeta<ProductI>) => void;
  login: (user: string, pass: string) => void;
  logout: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const [auth, setAuth] = useLocalStorage<LoginResponseI | undefined>({
    key: "auth",
    defaultValue: undefined,
  });
  const [cart, setCart] = useLocalStorage<{ [key: string]: CartMeta<ProductI>[] }>({
    key: "cart",
    defaultValue: {},
    // serialize: (value) => {
    //   /* return value serialized to string */
    //   return JSON.stringify(value);
    // },
    // deserialize: (localStorageValue) => {
    //   /* parse localStorage string value and return value */
    //   return new Map(JSON.parse(localStorageValue||"") as unknown)
    // },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [selected, setSelected] = useState<ProductI>();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [user, setUser] = useState<UserI>();
  const [users, setUsers] = useState<UserI[]>([]);
  const [userCart, setUserCart] = useState<CartMeta<ProductI>[]>([]);
  const [storagekey, setStoragekey] = useState<string>("guest");

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
  const addProductToCart = (product: CartMeta<ProductI>) => {
    const storageExist = cart[storagekey];
    if (storageExist) {
      const updatedCart = cart[storagekey]!.map((ce) =>
        ce.item.id !== product.item.id
          ? ce
          : { ...ce, quantity: !ce.quantity || ce.quantity === 0 ? 1 : ce.quantity + 1 },
      )!;
      setCart({ ...cart, [storagekey]: updatedCart });
    } else {
      setCart({ ...cart, [storagekey]: [product] });
    }
  };

  const removeProductFromCart = (product: CartMeta<ProductI>) => {
    const storageExist = cart[storagekey];
    if (storageExist) {
      const updatedCart = cart[storagekey]!.map((ce) =>
        ce.item.id !== product.item.id ? ce : { ...ce, quantity: ce.quantity < 1 ? 0 : ce.quantity - 1 },
      )!;
      setCart({ ...cart, [storagekey]: updatedCart });
    }
  };
  const getProductCartMeta = (product: ProductI): CartMeta<ProductI> => {
    const cartMeta: CartMeta<ProductI> =
      cart[storagekey]?.find((cm) => cm.item.id === product.id) ||
      ({
        item: product,
        quantity: 0,
      } as CartMeta<ProductI>);
    return cartMeta;
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
  };

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((_categories) => {
        setCategories(_categories);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    getUsers()
      .then((_users) => {
        setUsers(_users.users);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setUserCart(cart[storagekey]!);
  }, [cart]);

  useEffect(() => {
    const sk = auth?.username || "guest";
    setStoragekey(sk);
    setUserCart(cart[sk]!);
  }, [auth]);

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
        cart: userCart,
        user,
        users,
        totalProducts,
        categories,
        loading,
        getProductCartMeta,
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
