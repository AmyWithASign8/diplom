import React, {useState} from 'react';
import {Button, Center, Select, Stack} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconCircleMinus} from "@tabler/icons-react";
import {useGetAllTypes} from "../../../../shared/api/queries";
import {removeType} from "../../../../shared/api/queries";
import {showNotification} from "@mantine/notifications";
import {useMutation, useQueryClient} from "react-query";

export const AdminPanelRemoveProductTypeLayout = () => {
    const queryClient = useQueryClient()
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const { data, isSuccess } = useGetAllTypes();
    const mutationRemoveProductType = useMutation(() => removeType(selectedType), {
        onSuccess: () => queryClient.invalidateQueries(['getAllTypes'])
    })
    const removeTypeFunc = async () => {
        try {
            if (selectedType === null) showNotification({
                id: "load-data",
                title: "Ошибка",
                message: `Произошла ошщибка! Выберите новый тип для удаления`,
                autoClose: true,
                radius: "xl",
                icon: <IconAlertCircle/>
            });
                else{
                mutationRemoveProductType.mutate()
                setSelectedType('')
                showNotification({
                    id: "load-data",
                    title: "Удаление типа",
                    message: `Тип №${selectedType} успешно удален!`,
                    autoClose: true,
                    radius: "xl",
                    icon: <IconCheck size="1rem" />,
                });
            }
            setSelectedType(null)
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
    return (
        <div>
            <Center>
                <Stack>
                    <Select value={selectedType} label={'Выберите тип продукта который вы хотите удалить'} onChange={(value) => setSelectedType(value)} data={data.map((obj) => ({value: `${obj.id}`, label: `${obj.name}`}))}/>
                    <Button color={'red'} leftIcon={<IconCircleMinus/>} onClick={() => removeTypeFunc()}>Удалить</Button>
                </Stack>
            </Center>
        </div>
    );
};
