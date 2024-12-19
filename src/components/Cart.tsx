import React, { FC, useContext, useEffect, useState } from "react";
import { ActionIcon, Center, Group, Table, Text, rem } from "@mantine/core";
import { CartMeta, ProductI } from "@/types/interfaces";
import { AppContext } from "@/providers/AppProvider";
import { IconChevronDown, IconChevronUp, IconMoodEmpty } from "@tabler/icons-react";
import { ProductModal } from "./ProductModal";
import { formatCurrency } from "@/helpers";

const CartRow: FC<{ product: CartMeta<ProductI> }> = ({ product }) => {
  const { setSelected, removeProductFromCart, addProductToCart } = useContext(AppContext)!;

  return (
    <>
      <Table.Tr key={product.item.id}>
        <Table.Td
          td={"underline"}
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelected(product.item);
          }}
        >
          {product.item.title}
        </Table.Td>
        <Table.Td>{formatCurrency(product.item.price)}</Table.Td>
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
              {(product?.quantity || 0)}
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
  const rows = products && products.filter((p) => p.quantity > 0).map((p, i) => <CartRow product={p} key={i} />);
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
      {/* <Table.Caption>Scroll page</Table.Caption> */}
    </Table>
  );
};

const CartInfo: FC<{ products: CartMeta<ProductI>[] }> = ({ products }) => {
  const total =
    products &&
    products
      .filter((p) => p.quantity > 0)
      .map((p) => p.quantity * p.item.price)
      .reduce((p, c) => p + c, 0);
  return (
    <Group>
      <Text size="xl" fw={700} mt={"lg"}>
        Total: {formatCurrency(total)}
      </Text>
    </Group>
  );
};

const Cart: FC = () => {
  const { login, users, cart } = useContext(AppContext)!;
  return (
    <>
      <ProductModal />
      {cart && cart.filter((i) => i.quantity > 0).length > 0 ? (
        <>
          <CartTable products={cart} />
          <CartInfo products={cart} />
        </>
      ) : (
        <Center display={"flex"} style={{ flexDirection: "column" }}>
          <IconMoodEmpty size={rem(180)} />
          <Text size="xl">Your cart is empty.</Text>
        </Center>
      )}
    </>
  );
};

export { Cart };
