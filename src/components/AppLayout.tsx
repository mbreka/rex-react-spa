import React, { FC } from "react";
import { AppShell, Burger, Group, Skeleton, Box, Text, ScrollArea, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../public/logo.svg";
import { App } from "./App";
import { ProductModal } from "./ProductModal";
import { ProductsGrid } from "./ProductsGrid";
import { AppNavbar } from "./AppNavbar";

const AppLayout: FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Container size={"xl"}>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={900}>REX</Text>
            <img src={logo} height={60} />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" h={"100%"} style={{ overflowY: "scroll" }}>
          <ScrollArea>
            <AppNavbar />
            {/* {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))} */}
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main>
          {/* <App /> */}

          <ProductModal />
          <ProductsGrid />
        </AppShell.Main>
      </AppShell>
    </Container>
  );
};

export { AppLayout };
