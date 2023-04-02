import React, { FC } from "react";
import { Button, Center, Input, PasswordInput, Text } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface AuthFormInterface {
  auth: boolean;
  reg: boolean;
}
export const AuthForm: FC<AuthFormInterface> = ({ auth, reg }) => {
  return (
    <div>
      <Input
        icon={<IconAt />}
        placeholder="Введите ваш email"
        sx={() => ({
          width: 500,
        })}
        mb={10}
      />
      <PasswordInput
        placeholder="Введите ваш пароль"
        icon={<IconLock size="1rem" />}
      />
      <Center>
        {auth && (
          <Button
            variant={"gradient"}
            gradient={{ from: "yellow", to: "orange", deg: 45 }}
            mt={30}
          >
            Войти
          </Button>
        )}
        {reg && (
          <Button
            variant={"gradient"}
            gradient={{ from: "yellow", to: "orange", deg: 45 }}
            mt={30}
          >
            Зарегестрироваться
          </Button>
        )}
      </Center>
      {auth && (
        <Center>
          <Text color={"white"} fw={500} mr={5}>
            У вас еще нет аккаунта? Тогда вам нужно{" "}
          </Text>
          <Text
            component={Link}
            to={"/user/reg"}
            color={"orange"}
            td={"underline"}
          >
            Зарегистрироваться
          </Text>
        </Center>
      )}
      {reg && (
        <Center>
          <Text color={"white"} fw={500} mr={5}>
            У вас уже есть аккаунт? Тогда вам нужно{" "}
          </Text>
          <Text
            component={Link}
            to={"/user/auth"}
            color={"orange"}
            td={"underline"}
          >
            Войти
          </Text>
        </Center>
      )}
    </div>
  );
};
