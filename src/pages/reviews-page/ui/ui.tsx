import React from 'react';
import {Button, Center, Group, Stack, Text} from '@mantine/core'
import {CommentCard} from "../../../entities/comment-card";
import {IconPencil} from "@tabler/icons-react";

export const ReviewsLayout = () => {
    return (
        <div>
            <Group mt={100} ml={'25%'} position={'apart'} w={'47%'}>
                <Text size={30} fw={500}>Отзывы</Text>
                <Group>
                    <Text>Напишите свой отзыв:</Text>
                    <Button leftIcon={<IconPencil/>} color={'orange'} variant={'light'}>Написать</Button>
                </Group>
            </Group>
            <Center mt={100}>
                <Stack>
                    <CommentCard landing={false} maxWidth={900}/>
                    <CommentCard landing={false} maxWidth={900}/>
                    <CommentCard landing={false} maxWidth={900}/>
                    <CommentCard landing={false} maxWidth={900}/>
                </Stack>
            </Center>
        </div>
    );
};

