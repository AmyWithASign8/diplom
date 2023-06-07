import React from 'react';
import {IconError404, IconHome} from "@tabler/icons-react";
import {Button, Group, Stack, Text} from "@mantine/core";
import {Link} from "react-router-dom";

export const NotFoundLayout = () => {
    return (
        <div>
            <Stack align={'center'} mt={'15%'}>
                    <Group>
                        <IconError404 size={100}/>
                        <Text size={40}>Страница не найдена</Text>
                    </Group>
                    <Text size={'xl'}>Адрес на который вы пытаетесь попасть, вам недоступен или его не существует</Text>
                <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} leftIcon={<IconHome/>} component={Link} to={'/'}>На главную</Button>
            </Stack>
        </div>
    );
};
