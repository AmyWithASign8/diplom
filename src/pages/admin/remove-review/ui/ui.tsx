import React from 'react';
import {Button, Center, Select, Stack, Text} from "@mantine/core";
import {useMutation, useQueryClient} from "react-query";
import {removeReview} from "../../../../shared/api/queries/review/removeReview";
import {useGetAllReviews} from "../../../../shared/api/queries";
import {showNotification} from "@mantine/notifications";
import {IconAlertCircle, IconCheck, IconTrash} from "@tabler/icons-react";

export const AdminPanelRemoveReviewLayout = () => {
    const queryClient = useQueryClient()
    const {data, isSuccess} = useGetAllReviews()
    const [selectReview, setSelectedReview] = React.useState<any>(null)
    const mutation = useMutation(() => removeReview(selectReview), {
        onSuccess: () => queryClient.invalidateQueries(['getAllReviews'])
    })
    const deleteReview = async () => {
        try{
            mutation.mutate()
            showNotification({
                id: "load-data",
                title: "Удаление отзыва",
                message: `Отзыв №${selectReview} успешно удален!`,
                autoClose: true,
                radius: "xl",
                icon: <IconCheck size="1rem" />,
            });
            setSelectedReview('')
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
                {data.length === 0 ? <Text size={'xl'} mt={'10%'}>Отзывов нет</Text> : <Stack>
                    <Select label={'Выберите отзыв который нужно удалить'} placeholder={'Выберите отзыв'} value={selectReview} onChange={(value) => setSelectedReview(value)} data={data.map((obj) => ({value: `${obj.id}`, label: `${obj.title}`}))}/>
                    <Button onClick={() => deleteReview()} color={'red'} leftIcon={<IconTrash/>}>Удалить</Button>
                </Stack>}
            </Center>
        </div>
    );
};

