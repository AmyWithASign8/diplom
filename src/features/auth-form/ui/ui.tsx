import React, { FC } from "react";
import {
  Button,
  Center,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import {Link, useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registration } from "../../../shared/api/queries";
import { useStore } from "effector-react/compat";
import { $user, setUser } from "../../../app/models/userStore";
import { $isAuth, switchAuth } from "../../../app/models/isAuthStore";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

interface AuthFormInterface {
  auth: boolean;
  reg: boolean;
}
interface IFormInput {
  email: string;
  password: string;
}
export const AuthForm: FC<AuthFormInterface> = ({ auth, reg }) => {
  const navigate = useNavigate()
  const user = useStore($user);
  const isAuth = useStore($isAuth);
  console.log("Хуй", user);
  console.log("Пизда", isAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (auth && !reg) {
        const response: any = await login(data.email, data.password);
        setUser(response);
        switchAuth(true);
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("isAuth", String(isAuth));
      }
      if (!auth && reg) {
        const response: any = await registration(data.email, data.password);
        console.log(response);
        setUser(response);
        switchAuth(true);
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("isAuth", String(isAuth));
      }
      navigate('/')
    } catch (e) {
      modals.open({
        centered: true,
        title: "Произошла ошибка!",
        children: (
          <>
            <Text size={17}>
              Произошла ошибка авторизации! Возможно вы ввели неверные данные
              или произошла ошибка у нас на сервере! В регистрации возможно что
              такая почта уже зарегестрирована!
            </Text>
            <Button
              color={"red"}
              fullWidth
              onClick={() => modals.closeAll()}
              mt="md"
            >
              Ок
            </Button>
          </>
        ),
      });
    }
  };
  const ValidateFunc = (validateInput: any) => {
    if (validateInput?.ref.name === "email") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
      if (validateInput?.type === "maxLength")
        return "Email должен содержать менее 40 символов";
      if (validateInput?.type === "pattern")
        return "Неккоректный email, пример: example@gmail.com";
    } else if (validateInput?.ref.name === "password") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
      if (validateInput?.type === "maxLength")
        return "Пароль должен содержать менее 40 символов";
      if (validateInput?.type === "minLength")
        return "Пароль должен содержать не менее 6 символов";
      if (validateInput?.type === "pattern")
        return "Пароль должен содержать только латинские символы и хотя бы 1";
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          error={ValidateFunc(errors.email)}
          icon={<IconAt />}
          placeholder="Введите ваш email"
          sx={() => ({
            width: 500,
          })}
          mb={10}
          {...register("email", {
            required: true,
            maxLength: 40,
            pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/,
          })}
        />
        <PasswordInput
          error={ValidateFunc(errors.password)}
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 40,
            pattern: /[^А-Яа-я0-9]/,
          })}
          placeholder="Введите ваш пароль"
          icon={<IconLock size="1rem" />}
        />
        <Center>
          {auth && (
            <Button
              type={"submit"}
              variant={"gradient"}
              gradient={{ from: "yellow", to: "orange", deg: 45 }}
              mt={30}
            >
              Войти
            </Button>
          )}
          {reg && (
            <Button
              type={"submit"}
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
      </form>
    </>
  );
};
