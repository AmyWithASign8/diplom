import React from "react";
import {
  Alert,
  Button,
  Center,
  Divider,
  Group,
  Modal,
  Popover,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconAlertCircle, IconCheck,
  IconHistory,
  IconInfoCircle,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "effector-react/compat";
import {$user, logout} from "../../../app/models/userStore";
import {switchAuth} from "../../../app/models/isAuthStore";
import {removeUser} from "../../../shared/api/queries/user/removeUser";
import {showNotification} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";

export const ViewerLayout = () => {
  const navigate = useNavigate()
  const user = useStore($user);
  const [opened, { open, close }] = useDisclosure(false);
  const deleteAccount = async () => {
    const response = await removeUser(String(user?.id))
    try {
      logout()
      switchAuth(false)
      showNotification({
        id: "load-data",
        title: "Удаление аккаунта",
        message: `Ваш аккаунт был удален!`,
        autoClose: true,
        radius: "xl",
        icon: <IconCheck size="1rem" />,
      });
      close()
      navigate('/')
    }catch (e) {
      showNotification({
        id: "load-data",
        title: "Ошибка",
        message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
        autoClose: true,
        radius: "xl",
        icon: <IconAlertCircle/>
      });
    }
  }
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Удаление аккаунта" centered>
        <Text>
          Вы уверены что хотите удалить аккаунт? Удалив аккаунт вы никак не
          сможете его восстановить!
        </Text>
        <Group position={"center"} mt={"5%"}>
          <Button onClick={() => deleteAccount()} color={"green"} variant={"light"}>
            Да
          </Button>
          <Button onClick={close} color={"red"} variant={"light"}>
            Отмена
          </Button>
        </Group>
      </Modal>
      <Text ml={"8%"} mt={"5%"} fw={500} size={40} mr={100}>
        Мой профиль:
      </Text>
      <Center mt={"2%"} mb={120}>
        <Stack>
          <Tabs color="orange" defaultValue="info">
            <Tabs.List ml={10}>
              <Tabs.Tab value="info" icon={<IconInfoCircle size="0.8rem" />}>
                Общая информация
              </Tabs.Tab>
              <Tabs.Tab value="history" icon={<IconHistory size="0.8rem" />}>
                История заказов
              </Tabs.Tab>
              <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
                Настройки профиля
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="info" pt="xs">
              <Stack>
                <Group>
                  <Text
                    variant="gradient"
                    gradient={{ from: "yellow", to: "orange", deg: 45 }}
                    size={20}
                  >
                    Электронная почта: . . . . . . . .
                  </Text>
                  <Text size={20}>{user?.email}</Text>
                </Group>
                <Group>
                  <Text
                    variant="gradient"
                    gradient={{ from: "yellow", to: "orange", deg: 45 }}
                    size={20}
                  >
                    Пароль: . . . . . . . . . . . . . . . . . . .
                  </Text>
                  <Text size={20}>{user?.password}</Text>
                </Group>
                {/*  <Group>*/}
                {/*    <Text*/}
                {/*      variant="gradient"*/}
                {/*      gradient={{ from: "yellow", to: "orange", deg: 45 }}*/}
                {/*      size={20}*/}
                {/*    >*/}
                {/*      Количество заказов: . . . . . . .*/}
                {/*    </Text>*/}
                {/*    <Text size={20}>80</Text>*/}
                {/*  </Group>*/}
                {/*  <Group>*/}
                {/*    <Text*/}
                {/*      variant="gradient"*/}
                {/*      gradient={{ from: "yellow", to: "orange", deg: 45 }}*/}
                {/*      size={20}*/}
                {/*    >*/}
                {/*      Всего потрачено: . . . . . . . . . .*/}
                {/*    </Text>*/}
                {/*    <Text size={20}>8000 RUB</Text>*/}
                {/*  </Group>*/}
                {/*<Group>*/}
                {/*  <Text*/}
                {/*    variant="gradient"*/}
                {/*    gradient={{ from: "yellow", to: "orange", deg: 45 }}*/}
                {/*    size={20}*/}
                {/*  >*/}
                {/*    На сайте с. . . . . . . . . . . . . . . . .*/}
                {/*  </Text>*/}
                {/*  <Text size={20}>26.04.2023 года</Text>*/}
                {/*</Group>*/}
                {/*  <Group>*/}
                {/*    <Text*/}
                {/*      variant="gradient"*/}
                {/*      gradient={{ from: "yellow", to: "orange", deg: 45 }}*/}
                {/*      size={20}*/}
                {/*    >*/}
                {/*      Любимое блюдо: . . . . . . . . . .*/}
                {/*    </Text>*/}
                {/*    <Text size={20}>Сырная пицца(53 заказа)</Text>*/}
                {/*  </Group>*/}
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="history" pt="xs">
              <Stack>
                <Group>
                  <Text
                    variant="gradient"
                    gradient={{ from: "yellow", to: "orange", deg: 45 }}
                    size={20}
                  >
                    Заказ №
                  </Text>
                  <Text size={20}>777</Text>
                  <Divider size="sm" orientation="vertical" />
                  <Text
                    variant="gradient"
                    gradient={{ from: "yellow", to: "orange", deg: 45 }}
                    size={20}
                  >
                    Дата:
                  </Text>
                  <Text size={20}>24.03.2023 года</Text>
                </Group>

                <Group>
                  <Text size={20}>Сырная пицца</Text>
                  <Divider size="sm" orientation="vertical" />
                  <Text size={20}>Кол-во: 80</Text>
                </Group>
                <Group>
                  <Text size={20}>Сырная пицца</Text>
                  <Divider size="sm" orientation="vertical" />
                  <Text size={20}>Кол-во: 80</Text>
                </Group>
                <Text size={20}>Итоговая сумма заказа: 77777 RUB</Text>
              </Stack>
              <Divider mt={30} size={"xl"} mb={90} />
            </Tabs.Panel>
            <Tabs.Panel value={"settings"} pt={"xs"}>
              <Stack>
                <Group>
                  <Text size={20}>Изменить почту профиля</Text>
                  <TextInput w={300} placeholder={user?.email} />
                  <Button color={"orange"}>Сохранить изменения</Button>
                </Group>
                <Group>
                  <Text size={20}>Изменить пароль</Text>
                  <Popover
                    width={300}
                    trapFocus
                    position="bottom"
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <Button color={"orange"} variant={"subtle"}>
                        Нажмите чтобы сменить пароль
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <TextInput label="Ваш пароль" size="xs" />
                      <TextInput label="Новый пароль" size="xs" mt="xs" />
                      <Center>
                        <Button mt={10} color={"orange"}>
                          Сменить пароль
                        </Button>
                      </Center>
                    </Popover.Dropdown>
                  </Popover>
                </Group>
                <Button
                  onClick={open}
                  leftIcon={<IconTrash />}
                  color={"red"}
                  w={300}
                  mt={100}
                >
                  Удалить мой аккаунт
                </Button>
              </Stack>
            </Tabs.Panel>
          </Tabs>

          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Внимание!"
            color="orange"
          >
            Вся ваша статистика анонимна, другие пользователи не смогут никак ее
            посмотреть! В оставленных вами отзывах на странице "Отзывы", другие
            пользователи видят только название вашей электронной почты.
          </Alert>
        </Stack>
      </Center>
    </div>
  );
};
