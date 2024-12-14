import React, { FC, useContext } from "react";
import { Table } from "@mantine/core";
import { CartMeta, ProductI } from "@/types/interfaces";
import { AppContext } from "@/providers/AppProvider";

const CartTable: FC<{ products: CartMeta<ProductI>[] }> = ({ products }) => {
  const rows =
    products &&
    products.map((element) => (
      <Table.Tr key={element.item.id}>
        <Table.Td>{element.item.title}</Table.Td>
        <Table.Td>{element.item.price}$</Table.Td>
        <Table.Td>{element.quantity}</Table.Td>
      </Table.Tr>
    ));

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
      <CartTable products={cart} />
    </>
  );
};

export { Cart };
