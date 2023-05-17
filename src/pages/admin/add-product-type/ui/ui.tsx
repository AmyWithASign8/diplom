import React, {useState} from "react";
import {Center, Select, Stack, TextInput, Text, Loader, Chip, Group, Button} from "@mantine/core";
import {useGetAllBrands} from "../../../../shared/api/queries/brand/useGetBrands";
import {SubmitHandler, useForm} from "react-hook-form";
import {IconCheck, IconCirclePlus, IconAlertCircle} from "@tabler/icons-react";
import {createType} from "../../../../shared/api/queries/type/createType";
import {showNotification} from "@mantine/notifications";

interface IFormInput {
    name: string;
}
export const AdminPanelAddProductTypeLayout = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();
    const [checked, setChecked] = useState<string | number | null>(null);
    const [selectedBrandData, setSelectedBrandData] = useState<string | null>(null)
    const { data, isLoading, isSuccess } = useGetAllBrands();

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        try {
            const response = await createType(data.name, checked)
            showNotification({
                id: "load-data",
                title: "Создание типа",
                message: `Тип «${data.name}» успешно создан!`,
                autoClose: true,
                radius: "xl",
                icon: <IconCheck size="1rem" />,
            });
        }catch (e){
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Select
                    onChange={(value) => setChecked(value)}
                    label="Выберите вид продукта к которому будет относиться тип"
                    placeholder="Выберите вид"
                    data={data.map((obj) => ({value: `${obj.id}`, label: `${obj.name}`}))}
                />
                {checked === null ? <>
                    <Text color={'red'}>Выберите сначала к какому виду продукта будет относиться тип</Text>
                    <TextInput mt={20} disabled placeholder={"Введите название типа"} />
                    <Button fullWidth mt={20} disabled leftIcon={<IconCirclePlus/>}>Создать</Button></> : <>
                    <TextInput mt={20} {...register('name', {required: true})} error={errors.name?.type === 'required' && 'Обязательное поле'} placeholder={"Введите название типа"} />
                    <Button type={'submit'} fullWidth mt={20} leftIcon={<IconCirclePlus/>}>Создать</Button></>}
            </form>
        </Stack>
      </Center>
    </div>
  );
};
