import React from 'react';
import {useGetAllOrdersForAdmin} from "../../../../shared/api/queries/orders";
import {Accordion, Alert, Badge, Button, Center, Divider, Group, Image, Stack, Table, Text} from "@mantine/core";
import dayjs from "dayjs";
import {IconAlertCircle, IconUser, IconUserCircle} from "@tabler/icons-react";
import {CompletedOrder} from "../../../../shared/api/queries/orders/completedOrder";
import {useMutation, useQueryClient} from "react-query";

export const AdminPanelViewOrdersLayout = () => {
    const queryClient = useQueryClient()
    const mutationCompletedOrder = useMutation((id: number) => CompletedOrder('completed', id), {
        onSuccess: () => queryClient.invalidateQueries(['getAllOrdersForAdmin'])
    })
    const {data, isSuccess} = useGetAllOrdersForAdmin()
    const completedOrderFn = async (id: number) => {
        try{
            mutationCompletedOrder.mutate(id)
        }catch (e) {
            alert(e)
        }
    }
    if (!isSuccess) return <Center mt={'10%'}><Alert icon={<IconAlertCircle size="1rem" />} title="Ошибка!" color="red">
        Произошла ошибка при подключении, перезагрузите страницу или попробуйте позже
    </Alert></Center>
    return (
        <div>
            {data.length === 0 ? <Center mt={'10%'}><Text fw={500} size={'xl'}>Нет заказов в ожидании!</Text></Center> : <Accordion variant="separated" radius="md" defaultValue="customization">
                {data.map((obj) => (
                    <Accordion.Item value={String(obj.id)}>
                        <Accordion.Control>
                            <Group position={'apart'}>
                                <Text fw={500} size={18}>Заказ №{obj.id}</Text>
                                <Text fw={500} size={18}>Дата: {dayjs(obj.createdAt)
                                    .locale("ru")
                                    .format("DD MMMM YYYY HH:mm")}</Text>
                                <Text fw={500} size={18}>Сумма: {obj.price} RUB</Text>
                                <Group>
                                    <IconUserCircle/>
                                    <Text fw={500} size={'lg'}>{obj.user.email}</Text>
                                </Group>
                                {obj.status === 'waiting' ? <Button onClick={() => completedOrderFn(obj.id)}>Выполнен</Button> : <Badge color="green" size="lg" radius="lg" variant="filled">Выполнен</Badge>}
                            </Group>
                        </Accordion.Control>
                        {obj.orderProducts.map((obj) => (
                            <Accordion.Panel>
                                <Table highlightOnHover fontSize="md" horizontalSpacing="xl">
                                    <tbody>
                                    <tr key={obj.id}>
                                        <Group position={'apart'}>
                                            <Group>
                                                <td><Image src={`http://localhost:5000/${obj.product.image}`} width={150}/></td>
                                                <td><Stack>
                                                    <Text fw={500} size={18} w={300}>{obj.title}</Text>
                                                    {obj.product.brand.name === 'Пицца' &&
                                                        <Group>
                                                            <Text fw={500}>{obj.size === 25 ? 'Маленькая' : obj.size === 30 ? 'Средняя' : 'Большая'}, {obj.size} см, {obj.paste} тесто</Text>
                                                        </Group>
                                                    }
                                                </Stack></td>
                                            </Group>
                                            <td><Text fw={500}>{obj.product.brand.name}</Text></td>
                                            <td><Text fw={500}>{obj.product.type.name}</Text></td>
                                            <td><Text fw={500}>{obj.product.additional}</Text></td>
                                            <td><Text fw={500} mr={40}>{obj.price} RUB</Text></td>
                                        </Group>
                                    </tr>
                                    </tbody>
                                </Table>
                                <Divider/>
                            </Accordion.Panel>
                        ))}
                        <Divider/>
                    </Accordion.Item>
                ))}
            </Accordion>}
        </div>
    );
};