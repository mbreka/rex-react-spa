import React, { FC, useContext, useState } from "react";
import { AppContext } from "@/providers/AppProvider";
import { Box, Button, Center, TextInput, rem, Text, Card, SimpleGrid } from "@mantine/core";
import { useNavigate } from "react-router";

const Login: FC = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const { login, users } = useContext(AppContext)!;
  const navigate = useNavigate();

  return (
    <Center mih={"20vh"} display={"flex"} style={{ flexDirection: "column" }} mb={rem(40)}>
      <Box mt={rem(40)} mb={rem(10)}>
        <Text size={rem(20)}>Login with your email and password:</Text>
      </Box>
      <Box mt={rem(20)}>
        <TextInput label={"Email"} value={user} onChange={(e) => setUser(e.target.value)} />
        <TextInput label={"Password"} type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <Button
          fullWidth
          onClick={() => {
            login(user, pass);
            navigate("/");
          }}
          mt={rem(20)}
        >
          Login
        </Button>
      </Box>
      <Box mt={rem(40)} mb={rem(10)}>
        <Text size={rem(20)}>Or login using saved credentials:</Text>
      </Box>
      <SimpleGrid cols={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
        {users.map(
          ({
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
          }) => (
            <Card
              shadow="xs"
              style={{ cursor: "pointer" }}
              role="button"
              onClick={() => {
                login(username, password);
                navigate("/");
              }}
            >
              {" "}
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
            </Card>
          ),
        )}
      </SimpleGrid>
    </Center>
  );
};

export { Login };
