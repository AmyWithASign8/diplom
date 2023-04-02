import React from "react";
import BgImg from "../assets/images/BgImageByAuthPage.webp";
import { BackgroundImage, Box, Center, Text } from "@mantine/core";
import { AuthForm } from "../../../features/auth-form";

export const AuthLayout = () => {
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
              Авторизация
            </Text>
          </Center>
          <AuthForm auth={true} reg={false} />
        </Box>
      </Center>
    </BackgroundImage>
  );
};
