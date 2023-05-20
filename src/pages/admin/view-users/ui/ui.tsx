import React from 'react';
import {useGetAllUsers} from "../../../../shared/api/queries/user/useGetAllUsers";
import {Container, Table} from "@mantine/core";
import dayjs from "dayjs";

export const AdminPanelVewAllUsersLayout = () => {
    const {data, isSuccess} = useGetAllUsers()
    if (!isSuccess) return null
    return (
        <div>
            <Container bg={'rgba(0, 0, 0, 0.1);'} mt={'10%'}>
                <Table fontSize={'lg'}>
                    <thead>
                    <tr>
                        <th>Номер пользователя</th>
                        <th>Электронная почта</th>
                        <th>Дата создания</th>
                        <th>Роль</th>
                    </tr>
                    </thead>
                    <tbody>{data.map((obj) => (
                        <tr key={obj.id}>
                            <td>№ {obj.id}</td>
                            <td>{obj.email}</td>
                            <td>{dayjs(obj.createdAt)
                                .locale("ru")
                                .format("DD MMMM YYYY HH:mm")}</td>
                            <td>{obj.role}</td>
                        </tr>
                    ))}</tbody>
                </Table>
            </Container>
        </div>
    );
};

