import React, { FC } from "react";
import { ProductModal } from "./ProductModal";
import { ProductsGrid } from "./ProductsGrid";

const App: FC = () => {
  return (
    <>
      <ProductModal />
      <ProductsGrid />
    </>
  );
};

export { App };
