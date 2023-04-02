import React from "react";
import { AuthForm } from "../../../features/auth-form";
import {
  BackgroundImage,
  Box,
  Center,
  useMantineTheme,
  Text,
} from "@mantine/core";
import BgImg from "../assets/images/BgImageByAuthPage.webp";

export const RegistrationLayout = () => {
  const theme = useMantineTheme();
  return (
    <BackgroundImage src={BgImg}>
      <Center>
        <Box
          bg={"rgba(0, 0, 0, 0.5)"}
          mt={"7%"}
          mb={"3.4%"}
          sx={() => ({
            padding: 250,
            borderRadius: 30,
          })}
        >
          <Center>
            <Text
              mb={50}
              variant={"gradient"}
              gradient={{ from: "orange", to: "yellow", deg: 45 }}
              fw={500}
              size={40}
            >
              Регистрация
            </Text>
          </Center>
          <AuthForm auth={false} reg={true} />
        </Box>
      </Center>
    </BackgroundImage>
  );
};
