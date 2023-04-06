import React from "react";
import { Button, Center, Group, Modal, SimpleGrid } from "@mantine/core";
import { Header, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Link } from "react-router-dom";

export const AdminPanelLayout = () => {
  const UsersActions = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  };
  const OrdersActions = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  };
  const ReviewsActions = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  };
  return (
    <div>
      <Header height={"100%"} p={"1%"}>
        <Group position={"apart"}>
          <Text fw={500} size={25}>
            Admin panel
          </Text>
          <Button component={Link} to={"/"} color={"orange"} variant={"subtle"}>
            Выход на сайт
          </Button>
        </Group>
      </Header>
      <Center>
        <Text size={25}>
          Добро пожаловать на панель администрирования сайта Tasty pizza
        </Text>
      </Center>
      <Text size={20} mt={50} ml={"30%"}>
        Действия администратора:
      </Text>
      <Center mt={50}>
        <SimpleGrid cols={2} spacing={100}>
          <Button
            onClick={() => {
              modals.open({
                title: "Действия над пользователями",
                size: "xl",
                children: (
                  <Group>
                    <Button color={"red"} mt="md">
                      Удалить пользователя
                    </Button>
                    <Button
                      color={"orange.4"}
                      onClick={() => modals.closeAll}
                      mt="md"
                    >
                      Редактировать пользователя
                    </Button>
                    <Button onClick={() => modals.closeAll} mt="md">
                      Просмотр пользователей
                    </Button>
                  </Group>
                ),
              });
            }}
          >
            Действия с продуктами
          </Button>
          <Button onClick={UsersActions}>Действия с пользователями</Button>
          <Button onClick={OrdersActions}>Действия с заказами</Button>
          <Button onClick={ReviewsActions}>Действия с отзывами</Button>
        </SimpleGrid>
      </Center>
    </div>
  );
};
