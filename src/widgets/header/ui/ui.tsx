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
    IconLogout, IconMenu2,
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
import {useScreenSize} from "../../../shared/hooks";
import {Breakpoints} from "../../../shared/types";

export const Header = () => {
    const currentScreenSize = useScreenSize()
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
        height={currentScreenSize <= Breakpoints.xl ? 60 : 80}
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
                    <Image src={HeaderImg} width={currentScreenSize <= Breakpoints.xl ? 55 : 70} />
                    <Text
                        variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }}
                        fs={"Italic"}
                        fw={500}
                        size={currentScreenSize <= Breakpoints.xl ? 25 : 30}
                    >
                        Tasty pizza
                    </Text>
                </Group>
            </Link>
            {currentScreenSize < Breakpoints.lg && <Menu trigger={'hover'}>
                <Menu.Target>
                    <Button color={'orange'} variant={'subtle'} leftIcon={<IconMenu2/>}>Меню</Button>
                </Menu.Target>
                <Menu.Dropdown>
                       <Stack>
                           {dataNavigation.map((data) => (
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
                           ))}
                           {user?.role === "ADMIN" && (
                               <Button
                                   component={Link}
                                   to={"/admin-panel"}
                                   color={"orange"}
                                   variant={"subtle"}
                                   leftIcon={<IconAdjustmentsCog size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                                   size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                               >
                                   Админ. панель
                               </Button>
                           )}
                           <Button
                               color={theme === "light" ? "blue" : "orange"}
                               variant={"subtle"}
                               leftIcon={
                                   theme === "light" ? (
                                       <IconMoonStars color={mantineTheme.colors.blue[6]} size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>
                                   ) : (
                                       <IconSun color={mantineTheme.colors.yellow[4]} size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>
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
                                   leftIcon={<IconLogout size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                                   onClick={() => openLogoutModal()}
                                   size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                               >
                                   Выйти из аккаунта
                               </Button>
                           )}
                       </Stack>
                </Menu.Dropdown>
            </Menu>}
            {currentScreenSize >= Breakpoints.lg && <>
            <Menu>
                <Menu.Target>
                    <Button variant="subtle" color="orange" leftIcon={<IconLocation size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>} size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}>
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
            {currentScreenSize >= Breakpoints.xxl && <>
                <Button
                    component={Link}
                    to={"/catalog"}
                    leftIcon={<IconPizza size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                    variant="subtle"
                    color="orange"
                    size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                >
                    Каталог
                </Button>
                {isAuth && (
                    <Button
                        component={Link}
                        to={`/user/my-profile/${user?.id}`}
                        leftIcon={<IconUserCircle size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                        variant="subtle"
                        color="orange"
                        size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                    >
                        Мой профиль
                    </Button>
                )}
                {isAuth && (
                    <Button
                        leftIcon={<IconShoppingCart size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                        variant="subtle"
                        color="orange"
                        component={Link}
                        to={`/user/my-cart/${user?.id}`}
                        size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                    >
                        Корзина
                    </Button>
                )}
                {!isAuth && (
                    <Menu>
                        <Menu.Target>
                            <Button leftIcon={<IconUser size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>} variant="subtle" color="orange" size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}>
                                Авторизация
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Stack>
                                <Button
                                    component={Link}
                                    to={"/user/auth"}
                                    leftIcon={<IconUser size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                                    variant="subtle"
                                    color="orange"
                                    size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                                >
                                    Войти в аккаунт
                                </Button>
                                <Button
                                    component={Link}
                                    to={"/user/reg"}
                                    leftIcon={<IconUserPlus size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                                    variant="subtle"
                                    color="orange"
                                    size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                                >
                                    Регистрация
                                </Button>
                            </Stack>
                        </Menu.Dropdown>
                    </Menu>
                )}</>}
            {user?.role === "ADMIN" && (
                <Button
                    component={Link}
                    to={"/admin-panel"}
                    color={"orange"}
                    variant={"subtle"}
                    leftIcon={<IconAdjustmentsCog size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                    size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                >
                    Админ. панель
                </Button>
            )}
                {currentScreenSize < Breakpoints.xxl && <>
                    {!isAuth && (
                        <Menu>
                            <Menu.Target>
                                <Button leftIcon={<IconUser size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>} variant="subtle" color="orange" size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}>
                                    Авторизация
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Stack>
                                    <Button
                                        component={Link}
                                        to={"/user/auth"}
                                        leftIcon={<IconUser size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                                        variant="subtle"
                                        color="orange"
                                        size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                                    >
                                        Войти в аккаунт
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={"/user/reg"}
                                        leftIcon={<IconUserPlus size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                                        variant="subtle"
                                        color="orange"
                                        size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                                    >
                                        Регистрация
                                    </Button>
                                </Stack>
                            </Menu.Dropdown>
                        </Menu>
                    )}<div/></>}
            <Button
                color={theme === "light" ? "blue" : "orange"}
                variant={"subtle"}
                leftIcon={
                    theme === "light" ? (
                        <IconMoonStars color={mantineTheme.colors.blue[6]} size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>
                    ) : (
                        <IconSun color={mantineTheme.colors.yellow[4]} size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>
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
                    leftIcon={<IconLogout size={currentScreenSize >=Breakpoints.xxxl ? 28 : 20}/>}
                    onClick={() => openLogoutModal()}
                    size={currentScreenSize >=Breakpoints.xxxl ? 'lg' : 'md'}
                >
                    Выйти из аккаунта
                </Button>
            )}
            </>}
        </Group>
    </ManTineHeader>
  );
};
