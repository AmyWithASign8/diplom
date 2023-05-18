import {Button, Center, Select, Stack} from "@mantine/core";
import React from "react";
import {IconAlertCircle, IconCheck, IconCircleMinus} from "@tabler/icons-react";
import {useGetAllProducts} from "../../../../shared/api/queries/product/useGetAllProducts";
import {removeProduct} from "../../../../shared/api/queries/product";
import {showNotification} from "@mantine/notifications";

export const AdminPanelRemoveProductLayout = () => {
    const {data, isSuccess} = useGetAllProducts()
    const [checked, setChecked] = React.useState<string | null | number>(null)
    const removeProductFunc = async () => {
        try{
            const response = await removeProduct(checked)
            showNotification({
                id: "load-data",
                title: "Удаление продукта",
                message: `Продукт успешно удален!`,
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
    return (
        <div>
            <Center>
                <Stack>
                    <Select
                        onChange={(value) => setChecked(value)}
                        label="Выберите продукт который хотите удалить"
                        placeholder="Выберите продукт"
                        data={data.map((obj) => ({value: `${obj.id}`, label: `${obj.title}`}))}
                    />
                    <Button color={'red'} leftIcon={<IconCircleMinus/>} onClick={() => removeProductFunc()}>Удалить</Button>
                </Stack>
            </Center>
        </div>
    );
};

export default AdminPanelRemoveProductLayout;
