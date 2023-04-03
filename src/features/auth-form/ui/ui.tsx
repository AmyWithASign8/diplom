import React, { FC } from "react";
import {Button, Center, Input, PasswordInput, Text, TextInput} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

interface AuthFormInterface {
  auth: boolean;
  reg: boolean;
}
interface IFormInput{
    email: string,
    password: string
}
export const AuthForm: FC<AuthFormInterface> = ({ auth, reg }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
    const ValidateFunc = (validateInput: any) => {
        if (validateInput?.ref.name === 'email'){
            if (validateInput?.type === 'required') return 'Это поле не может быть пустым'
            if (validateInput?.type === 'maxLength') return 'Email должен содержать менее 20 символов'
            if (validateInput?.type === 'pattern') return 'Неккоректный email, пример: example@gmail.com'
        }else if (validateInput?.ref.name === 'password') {
            if (validateInput?.type === 'required') return 'Это поле не может быть пустым'
            if (validateInput?.type === 'maxLength') return 'Пароль должен содержать менее 20 символов'
            if (validateInput?.type === 'minLength') return 'Пароль должен содержать не менее 6 символов'
            if (validateInput?.type === 'pattern') return 'Пароль должен содержать только латинские символы'
        }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
          error={ValidateFunc(errors.email)}
        icon={<IconAt />}
        placeholder="Введите ваш email"
        sx={() => ({
          width: 500,
        })}
        mb={10}
          {...register("email", {required: true ,maxLength: 20, pattern: /[^А-Яа-я0-9]^\S+@\S+$/})}
      />
      <PasswordInput
          error={ValidateFunc(errors.password)}
          {...register("password", {required: true,minLength: 6, maxLength: 20, pattern: /[^А-Яа-я0-9]/})}
        placeholder="Введите ваш пароль"
        icon={<IconLock size="1rem" />}
      />
      <Center>
        {auth && (
          <Button
              type={'submit'}
            variant={"gradient"}
            gradient={{ from: "yellow", to: "orange", deg: 45 }}
            mt={30}
          >
            Войти
          </Button>
        )}
        {reg && (
          <Button
              type={'submit'}
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
  );
};
