import React from "react";
import {
    Button,
    Group,
    Image,
    Text,
    Header as ManTineHeader,
    Menu,
    Grid,
    useMantineTheme,
    Stack
} from "@mantine/core";
import HeaderImg from "../assets/images/favicon.png";
import {
  IconAdjustmentsCog,
  IconHome2,
  IconInfoCircle,
  IconLocation,
  IconLogout,
  IconMessages,
  IconMoonStars,
  IconPizza,
  IconShoppingCart,
  IconSun,
  IconUser,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useStore } from "effector-react/compat";
import { $theme, switchTheme } from "../../../app/models/themeStore";
import { notifications } from "@mantine/notifications";
import { $isAuth, switchAuth } from "../../../app/models/isAuthStore";
import { $user, logout } from "../../../app/models/userStore";
import { modals } from "@mantine/modals";

export const Header = () => {
    const navigate = useNavigate()
  const user = useStore($user);
  const isAuth = useStore($isAuth);
  const mantineTheme = useMantineTheme();
  const theme = useStore($theme);
  localStorage.setItem("theme", theme);
  const altTheme = theme === "light" ? "dark" : "light";
  const dataNavigation = isAuth
    ? [
        { name: "Главная", icon: <IconHome2 />, currentUrl: "/" },
        { name: "Каталог", icon: <IconPizza />, currentUrl: "/catalog" },
        {
          name: "Корзина",
          icon: <IconShoppingCart />,
          currentUrl: `/user/my-cart/${user?.id}`,
        },
        {
          name: "Мой профиль",
          icon: <IconUserCircle />,
          currentUrl: `/user/my-profile/${user?.id}`,
        },
        {
          name: "Отзывы",
          icon: <IconMessages />,
          currentUrl: "/reviews",
        },
        { name: "О нас", icon: <IconInfoCircle />, currentUrl: "/about-us" },
      ]
    : [
        { name: "Главная", icon: <IconHome2 />, currentUrl: "/" },
        { name: "Каталог", icon: <IconPizza />, currentUrl: "/catalog" },
        { name: "Авторизация", icon: <IconUser />, currentUrl: "/user/auth" },
        {
          name: "Регистрация",
          icon: <IconUserPlus />,
          currentUrl: "/user/reg",
        },
        {
          name: "Отзывы",
          icon: <IconMessages />,
          currentUrl: "/reviews",
        },
        { name: "О нас", icon: <IconInfoCircle />, currentUrl: "/about-us" },
      ];
  const urll = useLocation();
  const openLogoutModal = () =>
    modals.openConfirmModal({
      centered: true,

      title: "Подтвердите свое действие",
      children: <Text size="15">Вы уверены что хотите выйти из акканта?</Text>,
      labels: { confirm: "Да", cancel: "Отмена" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        localStorage.removeItem("token");
        logout()
        switchAuth(false);
        navigate('/')
      },
    });
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
            <Button variant="subtle" color="orange" leftIcon={<IconLocation size={28}/>} size={'lg'}>
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
        <Button
          component={Link}
          to={"/catalog"}
          leftIcon={<IconPizza size={28}/>}
          variant="subtle"
          color="orange"
          size={'lg'}
        >
          Каталог
        </Button>
        {isAuth && (
          <Button
            component={Link}
            to={`/user/my-profile/${user?.id}`}
            leftIcon={<IconUserCircle size={28}/>}
            variant="subtle"
            color="orange"
            size={'lg'}
          >
            Мой профиль
          </Button>
        )}
        {isAuth && (
              <Button
                  leftIcon={<IconShoppingCart size={28}/>}
                  variant="subtle"
                  color="orange"
                  component={Link}
                  to={`/user/my-cart/${user?.id}`}
                  size={'lg'}
              >
                  Корзина
              </Button>
        )}
        {!isAuth && (
          <Menu>
            <Menu.Target>
              <Button leftIcon={<IconUser size={28}/>} variant="subtle" color="orange" size={'xl'}>
                Авторизация
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Stack>
                <Button
                  component={Link}
                  to={"/user/auth"}
                  leftIcon={<IconUser size={28}/>}
                  variant="subtle"
                  color="orange"
                  size={'lg'}
                >
                  Войти в аккаунт
                </Button>
                <Button
                  component={Link}
                  to={"/user/reg"}
                  leftIcon={<IconUserPlus size={28}/>}
                  variant="subtle"
                  color="orange"
                  size={'lg'}
                >
                  Регистрация
                </Button>
              </Stack>
            </Menu.Dropdown>
          </Menu>
        )}
        {user?.role === "ADMIN" && (
          <Button
            component={Link}
            to={"/admin-panel"}
            color={"orange"}
            variant={"subtle"}
            leftIcon={<IconAdjustmentsCog size={28}/>}
            size={'lg'}
          >
            Админ. панель
          </Button>
        )}
        <Button
          color={theme === "light" ? "blue" : "orange"}
          variant={"subtle"}
          leftIcon={
            theme === "light" ? (
              <IconMoonStars color={mantineTheme.colors.blue[6]} size={28}/>
            ) : (
              <IconSun color={mantineTheme.colors.yellow[4]} size={28}/>
            )
          }
          size={'md'}
          onClick={() => switchThemeAndShowNotification()}
        >
          Сменить тему
        </Button>
        {isAuth && (
          <Button
            color={"red"}
            leftIcon={<IconLogout size={28}/>}
            onClick={() => openLogoutModal()}
            size={'md'}
          >
            Выйти из аккаунта
          </Button>
        )}
      </Group>
    </ManTineHeader>
  );
};
