import React from "react";
import {
  Button,
  Group,
  Header,
  Menu,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useStore } from "effector-react/compat";
import { $theme, switchTheme } from "../../../app/models/themeStore";
import { notifications } from "@mantine/notifications";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export const AdminPanelHeader = () => {
  const mantineTheme = useMantineTheme();
  const theme = useStore($theme);
  localStorage.setItem("theme", theme);
  const altTheme = theme === "light" ? "dark" : "light";
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
    <Header height={"100%"} p={"1%"}>
      <Group position={"apart"}>
        <Text fw={500} size={25}>
          Admin panel
        </Text>

        <Button component={Link} to={"/"} color={"orange"}>
          Выход на сайт
        </Button>
        <Button component={Link} to={"/admin-panel"}>
          Главная
        </Button>
        <Menu>
          <Menu.Target>
            <Button>Действия над пользователями</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Stack>
              <Button color={"red"} component={Link} to={'remove-user'}>Удалить пользователя</Button>
              <Button component={Link} to={'view-all-users'}>Просмотр пользователей</Button>
            </Stack>
          </Menu.Dropdown>
        </Menu>
        <Menu>
          <Menu.Target>
            <Button>Действия над продуктами</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Stack>
              <Button color={"green"} component={Link} to={"add-product"}>
                Добавить продукт
              </Button>
              <Button
                color={"orange.5"}
                component={Link}
                to={"add-product-type"}
              >
                Добавить тип продукта
              </Button>
              <Button color={"red"} component={Link} to={'remove-product-type'}>Удалить тип продукта</Button>
              <Button component={Link} to={'remove-product'} color={"red"}>Удалить продукт</Button>
            </Stack>
          </Menu.Dropdown>
        </Menu>
        <Menu>
          <Menu.Target>
            <Button>Действия над отзывами</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Stack>
              <Button color={"green"}>Добавить отзыв</Button>
              <Button color={"red"} component={Link} to={'remove-review'}>Удалить отзыв</Button>
            </Stack>
          </Menu.Dropdown>
        </Menu>
        <Menu>
          <Menu.Target>
            <Button>Действия над заказами</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Stack>
              <Button color={"red"}>Удалить заказ</Button>
              <Button>Просмотр заказов</Button>
            </Stack>
          </Menu.Dropdown>
        </Menu>
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
    </Header>
  );
};
