import React from 'react';
import {useGetAllReviewsForAdmin} from "../../../../shared/api/queries";
import {Stack, SimpleGrid, Center, Text} from '@mantine/core'
import {CommentCard} from "../../../../entities/comment-card";

export const AdminPanelApprovalReviewLayout = () => {
    const {data, isSuccess} = useGetAllReviewsForAdmin()
    console.log(data)
    if (!isSuccess) return null
    return (
        <div>
            {data.length === 0 ? <Center><Text size={'xl'} mt={'10%'}>Отзывов на рассмотрении нет</Text></Center> :
                <SimpleGrid cols={1}>
                    <Stack align={'center'}>
                        {data.map((obj) => (<CommentCard maxWidth={700} adminPanel={true} reviewData={obj}/>))}
                    </Stack>
                </SimpleGrid>}
        </div>
    );
};