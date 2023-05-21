import React from 'react';
import {Button, Center, Select, Stack} from "@mantine/core";
import {useGetAllUsers, User} from "../../../../shared/api/queries/user/useGetAllUsers";
import {IconAlertCircle, IconCheck, IconTrash} from "@tabler/icons-react";
import {useMutation, useQueryClient} from "react-query";
import {removeUser} from "../../../../shared/api/queries/user/removeUser";
import {showNotification} from "@mantine/notifications";

export const AdminPanelRemoveUserLayout = () => {
    const queryClient = useQueryClient()
    let users: User[] = []
    const {data, isSuccess} = useGetAllUsers()
    const [selectUser, setSelectUser] = React.useState<string | null>(null)
    const mutationRemoveUser = useMutation(() => removeUser(selectUser), {
        onSuccess: () => queryClient.invalidateQueries(['getAllUsers'])
    })
    const deleteAccount = async () => {
        try {
            mutationRemoveUser.mutate()
            setSelectUser('')
            showNotification({
                id: "load-data",
                title: "Удаление пользователя",
                message: `Пользователь №«${selectUser}» успешно удален!`,
                autoClose: true,
                radius: "xl",
                icon: <IconCheck size="1rem" />,
            });
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
    if (!isSuccess) return null
    if (!data) return null
    data.map((obj) => (obj.role !== "ADMIN" && users.push(obj)))
    return (
        <div>
            <Center>
                <Stack>
                    <Select
                        value={String(selectUser)}
                        onChange={(value) => setSelectUser(value)}
                        label="Выберите пользователя которого хотите удалить"
                        placeholder="Выберите пользователя"
                        data={users.map((obj) => ({value: `${obj.id}`, label: `${obj.email}`}))}
                    />
                    <Button onClick={() => deleteAccount()} leftIcon={<IconTrash/>} color={'red'}>Удалить</Button>
                </Stack>
            </Center>
        </div>
    );
};

