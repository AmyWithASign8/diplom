import React, {useState} from 'react';
import {Button, Center, Select, Stack} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconCircleMinus} from "@tabler/icons-react";
import {useGetAllTypes} from "../../../../shared/api/queries/type/useGetAllTypes";
import {removeType} from "../../../../shared/api/queries/type/removeType";
import {showNotification} from "@mantine/notifications";

export const AdminPanelRemoveProductTypeLayout = () => {

    const [selectedType, setSelectedType] = useState<number | string | null>(null);
    const { data, isLoading, isSuccess } = useGetAllTypes();
    console.log(data)
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
                const response = await removeType(selectedType)
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
                    <Select label={'Выберите тип продукта который вы хотите удалить'} onChange={(value) => setSelectedType(value)} data={data.map((obj) => ({value: `${obj.id}`, label: `${obj.name}`}))}/>
                    <Button color={'red'} leftIcon={<IconCircleMinus/>} onClick={() => removeTypeFunc()}>Удалить</Button>
                </Stack>
            </Center>
        </div>
    );
};
