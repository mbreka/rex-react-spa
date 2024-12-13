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
} from "@mantine/core";
import { IconBrandGithub, IconLogin, IconLogout, IconSearch, IconShoppingBag, IconShoppingCartX } from "@tabler/icons-react";
import { FC, useState, useContext, useEffect } from "react";
import { UserI } from "@/types/interfaces";

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
  return (
    <Stack>
      <Center>
        <img src={image} width={rem(16)} height={rem(16)} />
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
        <Button
          variant="light"
          fullWidth
          leftSection={<IconShoppingBag />}
          // rightSection={<Badge variant="light">8</Badge>}
        >
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
  const { login } = useContext(AppContext)!;
  return (
    <Stack>
      <Button
        variant="light"
        fullWidth
        styles={{ root: { alignItems: "space-between" } }}
        leftSection={<IconLogout />}
        onClick={() => {
          login("", "");
        }}
      >
        Login
      </Button>
    </Stack>
  );
};

const AppNavbar: FC = () => {
  const { user } = useContext(AppContext)!;

  return (
    <>
      {user && <UserInfo user={user} />}
      {!user && <Guest />}
      <Space h={rem(50)} />
      <Button leftSection={<IconBrandGithub/>} onClick={()=>{
        window.location.assign("https://github.com/mbreka/rex-react-spa/network");
      }} fullWidth variant="light">
        Github Code
      </Button>
    </>
  );
};

export { AppNavbar };
