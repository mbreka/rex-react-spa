import React, { FC, useEffect } from "react";
import { AppShell, Burger, Group, Image, Skeleton, Box, Text, ScrollArea, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../public/logo.svg";
import { App } from "./App";
import { ProductModal } from "./ProductModal";
import { ProductsGrid } from "./ProductsGrid";
import { AppNavbar } from "./AppNavbar";
import { Route, Routes, useLocation } from "react-router";
import { Login } from "./Login";
import { Cart } from "./Cart";

const AppLayout: FC = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();

  useEffect(()=>{
    close();
  }, [location])

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
            <Image src={logo} h={60} w={60} />
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

          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Container>
  );
};

export { AppLayout };
