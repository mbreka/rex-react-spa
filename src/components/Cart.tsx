import React, { FC, useContext, useEffect, useState } from "react";
import { ActionIcon, Table } from "@mantine/core";
import { CartMeta, ProductI } from "@/types/interfaces";
import { AppContext } from "@/providers/AppProvider";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Link } from "react-router";

import { ProductModal } from "./ProductModal";

const CartRow: FC<{ product: CartMeta<ProductI> }> = ({ product }) => {
  const { selected, setSelected, totalProducts, cart, getProductCartMeta, removeProductFromCart, addProductToCart } =
    useContext(AppContext)!;

  return (
    <>
      <Table.Tr key={product.item.id}>
        <Table.Td
          onClick={() => {
            setSelected(product.item);
          }}
        >
          {product.item.title}
        </Table.Td>
        <Table.Td>{product.item.price}$</Table.Td>
        <Table.Td>
          <ActionIcon.Group>
            <ActionIcon
              variant="default"
              size="sm"
              radius="md"
              onClick={() => {
                if (!product) {
                  return;
                }
                removeProductFromCart(product);
              }}
            >
              <IconChevronDown color="var(--mantine-color-red-text)" />
            </ActionIcon>
            <ActionIcon.GroupSection variant="default" size="sm" bg="var(--mantine-color-body)" miw={60}>
              {/* {value} */}
              {product?.quantity || 0}
            </ActionIcon.GroupSection>
            <ActionIcon
              variant="default"
              size="sm"
              radius="md"
              onClick={() => {
                if (!product) {
                  return;
                }
                addProductToCart(product);
              }}
            >
              <IconChevronUp color="var(--mantine-color-teal-text)" />
            </ActionIcon>
          </ActionIcon.Group>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

const CartTable: FC<{ products: CartMeta<ProductI>[] }> = ({ products }) => {
  const rows = products && products.map((p, i) => <CartRow product={p} key={i} />);
  return (
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Price/Item</Table.Th>
          <Table.Th>Quantity</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page</Table.Caption>
    </Table>
  );
};

const Cart: FC = () => {
  const { login, users, cart } = useContext(AppContext)!;
  return (
    <>
      <ProductModal />
      <CartTable products={cart} />
    </>
  );
};

export { Cart };
