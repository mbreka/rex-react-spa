import React from "react";
import { AppContext } from "@/providers/AppProvider";
import {
  Card,
  ActionIcon,
  rem,
  NativeSelect,
  Grid,
  Center,
  Pagination,
  Stack,
  Text,
  Box,
  Button,
  Badge,
  Space,
  Image,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconLogin,
  IconLogout,
  IconSearch,
  IconShoppingBag,
  IconShoppingCartX,
} from "@tabler/icons-react";
import { FC, useState, useContext, useEffect } from "react";
import { UserI } from "@/types/interfaces";
import { useNavigate } from "react-router";

const UserInfo: FC<{ user: UserI }> = ({
  user: {
    id,
    firstName,
    lastName,
    maidenName,
    age,
    gender,
    email,
    phone,
    username,
    password,
    birthDate,
    image,
    bloodGroup,
    height,
    weight,
    eyeColor,
    hair,
    ip,
    address,
    macAddress,
    university,
    bank,
    company,
    ein,
    ssn,
    userAgent,
    crypto,
    role,
  },
}) => {
  const { logout } = useContext(AppContext)!;
  const navigate = useNavigate();

  return (
    <Stack>
      <Center h={rem(100)}>
        <Image src={image} w={64} h={64} />
      </Center>
      <Box>
        <Text fw={700} size={rem(20)}>
          {firstName} {lastName}
        </Text>
        <Text fw={400} size={rem(18)}>
          {role}
        </Text>
      </Box>
      <Stack>
        <Button variant="light" fullWidth leftSection={<IconShoppingBag />} onClick={() => navigate("/")}>
          Home
        </Button>
        <Button variant="light" fullWidth leftSection={<IconShoppingBag />} onClick={() => navigate("/cart")}>
          Cart
        </Button>
        <Button
          variant="light"
          fullWidth
          styles={{ root: { alignItems: "space-between" } }}
          leftSection={<IconLogin />}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </Stack>
      {/* {JSON.stringify(user)} */}
    </Stack>
  );
};

const Guest: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="light" fullWidth leftSection={<IconShoppingBag />} onClick={() => navigate("/")}>
        Home
      </Button>
      <Button variant="light" fullWidth leftSection={<IconShoppingBag />} onClick={() => navigate("/cart")}>
        Cart
      </Button>
      <Button
        variant="light"
        fullWidth
        styles={{ root: { alignItems: "space-between" } }}
        leftSection={<IconLogout />}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </>
  );
};

const AppNavbar: FC = () => {
  const { user } = useContext(AppContext)!;

  return (
    <Stack>
      {user && <UserInfo user={user} />}
      {!user && <Guest />}
      <Space h={rem(50)} />
      <Button
        leftSection={<IconBrandGithub />}
        onClick={() => {
          window.location.assign("https://github.com/mbreka/rex-react-spa/network");
        }}
        fullWidth
        variant="light"
      >
        Github Code
      </Button>
    </Stack>
  );
};

export { AppNavbar };
