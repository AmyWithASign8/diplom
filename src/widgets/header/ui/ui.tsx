import React from "react";
import {
  Button,
  Group,
  Image,
  Text,
  Header as ManTineHeader,
  Menu,
  Grid,
  ColorScheme,
  useMantineTheme,
} from "@mantine/core";
import HeaderImg from "../assets/images/favicon.png";
import {
  IconHome2,
  IconInfoCircle,
  IconLocation,
  IconMoonStars,
  IconPizza,
  IconSettings,
  IconShoppingCart,
  IconSun,
  IconUser,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "effector-react/compat";
import { $theme, switchTheme } from "../../../app/models/themeStore";
import { notifications } from "@mantine/notifications";

export const Header = () => {
  const mantineTheme = useMantineTheme();
  const theme = useStore($theme);
  localStorage.setItem("theme", theme);
  const altTheme = theme === "light" ? "dark" : "light";
  const dataNavigation = [
    { name: "Главная", icon: <IconHome2 />, currentUrl: "/" },
    { name: "Каталог", icon: <IconPizza />, currentUrl: "/catalog" },
    { name: "Авторизация", icon: <IconUser />, currentUrl: "/user/auth" },
    { name: "Регистрация", icon: <IconUserPlus />, currentUrl: "/user/reg" },
    { name: "Корзина", icon: <IconShoppingCart />, currentUrl: "/cart" },
    { name: "Мой профиль", icon: <IconUserCircle />, currentUrl: "/about-us" },
    {
      name: "Мои настройки",
      icon: <IconSettings />,
      currentUrl: "/about-us",
    },
    { name: "О нас", icon: <IconInfoCircle />, currentUrl: "/about-us" },
  ];
  const urll = useLocation();
  const switchThemeAndShowNotification = () => {
    switchTheme(altTheme);
    notifications.show({
      icon:
        altTheme === "light" ? (
          <IconSun color={mantineTheme.colors.yellow[4]} size={60} />
        ) : (
          <IconMoonStars />
        ),
      title: `Тема переключена`,
      message: `Установлена ${
        altTheme === "light" ? "светлая" : "темная"
      } тема приложения`,
    });
  };
  return (
    <ManTineHeader
      height={80}
      sx={() => ({
        position: "fixed",
        width: "100%",
        opacity: 0.8,
        transition: "0.7s opacity",

        "&:hover": {
          opacity: 1,
          transition: "0.7s opacity",
        },
      })}
    >
      <Group position={"apart"} mr={"5%"}>
        <Link to={"/"}>
          <Group>
            <Image src={HeaderImg} width={70} />
            <Text
              variant="gradient"
              gradient={{ from: "yellow", to: "orange", deg: 45 }}
              fs={"Italic"}
              fw={500}
              size={30}
            >
              Tasty pizza
            </Text>
          </Group>
        </Link>
        <Menu>
          <Menu.Target>
            <Button variant="subtle" color="orange" leftIcon={<IconLocation />}>
              Навигация по сайту
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Grid
              grow
              maw={600}
              gutter={"xs"}
              sx={() => ({
                textAlign: "center",
                padding: 10,
              })}
            >
              {dataNavigation.map((data) => (
                <Grid.Col span={4} key={data.name}>
                  <Button
                    component={Link}
                    to={data.currentUrl}
                    variant={
                      urll.pathname === data.currentUrl ? "filled" : "subtle"
                    }
                    color={"orange"}
                    leftIcon={data.icon}
                  >
                    {data.name}
                  </Button>
                </Grid.Col>
              ))}
            </Grid>
          </Menu.Dropdown>
        </Menu>
        <Button leftIcon={<IconUser />} variant="subtle" color="orange">
          Действия пользователя
        </Button>
        <Button
          leftIcon={<IconShoppingCart />}
          variant="subtle"
          color="orange"
          component={Link}
          to={"/cart"}
        >
          Корзина
        </Button>
        <Button
          color={theme === "light" ? "blue" : "orange"}
          variant={"subtle"}
          leftIcon={
            theme === "light" ? (
              <IconMoonStars color={mantineTheme.colors.blue[6]} />
            ) : (
              <IconSun color={mantineTheme.colors.yellow[4]} />
            )
          }
          onClick={() => switchThemeAndShowNotification()}
        >
          Сменить тему
        </Button>
      </Group>
    </ManTineHeader>
  );
};
