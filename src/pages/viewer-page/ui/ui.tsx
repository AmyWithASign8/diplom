import React, {useState} from "react";
import {
  Alert,
  Button,
  Center,
  Divider,
  Group,
  Modal, PasswordInput,
  Popover, Spoiler,
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
import {SubmitHandler, useForm} from "react-hook-form";
import {updateEmail} from "../../../shared/api/queries/user/updateEmail";
import {modals} from "@mantine/modals";
import {updatePassword} from "../../../shared/api/queries/user/updatePassword";

interface IFormInput {
  email: string;
}
interface IFormPasswordInput {
  oldPassword: string,
  newPassword: string
}
export const ViewerLayout = () => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const {
    register: registerPsw,
    handleSubmit: handleSubmitPsw,
    formState: { errors: errorsPsw },
  } = useForm<IFormPasswordInput>();
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
  const changePassword: SubmitHandler<IFormPasswordInput> = async (data) => {
    try {
      const response = updatePassword(data.newPassword, user?.id)
      setOpenedPopover(false)
      showNotification({
        id: "load-data",
        title: "Обновление данных аккаунта",
        message: `Ваш пароль был перезаписан!`,
        autoClose: true,
        radius: "xl",
        icon: <IconCheck size="1rem" />,
      });
      modals.openConfirmModal({
        centered: true,
        title: "Перезапуск аккаунта",
        children: <Text size="15">Вы изменили пароль, чтобы изменения вступили в силу вам необходимо перезайти в аккаунт</Text>,
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
    }catch (e) {
      showNotification({
        id: "load-data",
        title: "Ошибка",
        message: `Произошла ошщибка! Возможно вы не авторизованы или у нас проблемы с соединением!`,
        autoClose: true,
        radius: "xl",
        icon: <IconAlertCircle/>
      });
    }
  }
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await updateEmail(data.email, user?.id)
      showNotification({
        id: "load-data",
        title: "Обновление данных аккаунта",
        message: `Ваша почта была перезаписана!`,
        autoClose: true,
        radius: "xl",
        icon: <IconCheck size="1rem" />,
      });
      modals.openConfirmModal({
        centered: true,
        title: "Перезапуск аккаунта",
        children: <Text size="15">Вы изменили электронную почту, чтобы изменения вступили в силу вам необходимо перезайти в аккаунт</Text>,
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
    }catch (e) {
      showNotification({
        id: "load-data",
        title: "Ошибка",
        message: `Произошла ошщибка! Возможно такая почта уже существует, попробуйте ввести другую почту, или вы не авторизованы или у нас проблемы с соединением!`,
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
                  <Spoiler maxHeight={0} showLabel="Показать пароль" hideLabel="Скрыть пароль" color={'orange'}>
                    <Text size={20}>{user?.password}</Text>
                  </Spoiler>
                </Group>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Text size={20}>Изменить почту профиля</Text>
                    <Group><TextInput {...register('email', {required: true, pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/, maxLength: 60})} error={errors.email?.type === 'required' ? 'Поле обязательно для заполнения' :  errors.email?.type === 'maxLength' ? 'Максимальное кол-во символов 60 ед.' : errors.email?.type === 'pattern' ? 'Неправильный вид почты, пример: example@gmail.com' : ''} w={300} placeholder={user?.email} />
                      <Button type={'submit'} color={"orange"}>Сохранить изменения</Button></Group>
                  </form>
                <Group>
                  <Text size={20}>Изменить пароль</Text>
                  <Popover
                    width={300}
                    trapFocus
                    position="bottom"
                    withArrow
                    shadow="md"
                    opened={openedPopover} onChange={setOpenedPopover}
                  >
                    <Popover.Target>
                      <Button color={"orange"} variant={"subtle"} onClick={() => setOpenedPopover((o) => !o)}>
                        Нажмите чтобы сменить пароль
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <form onSubmit={handleSubmitPsw(changePassword)}>
                        <PasswordInput label="Ваш пароль" size="xs" {...registerPsw('oldPassword', {required: true, validate: (val: string) => {
                            if (user?.password != val) {
                              return "Вы ввели неверный пароль";
                            }
                          }})} error={errorsPsw.oldPassword?.type === 'required' ? 'Поле обязательно для заполнения' : errorsPsw.oldPassword?.type === 'validate' ? 'Вы ввели ваш старый пароль  неверно' : ''}/>
                        <PasswordInput label="Новый пароль" size="xs" mt="xs" {...registerPsw('newPassword', {required: true, minLength: 6,
                          maxLength: 60,
                          pattern: /[^А-Яа-я0-9]/})} error={errorsPsw.newPassword?.type === 'required' ? 'Поле обязательно для заполнения' : errorsPsw.newPassword?.type === 'minLength' ? 'Минимальная длина пароля должно содержать 6 символов' : errorsPsw.newPassword?.type === 'maxLength' ? 'Максимальная длина пароля не должна превышать 60 символов' : errorsPsw.newPassword?.type === 'pattern' ? 'Пароль должен содержать только латинские буквы и хотя бы 1' : ''}/>
                        <Center>
                          <Button type={'submit'} mt={10} color={"orange"}>
                            Сменить пароль
                          </Button>
                        </Center>
                      </form>
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
