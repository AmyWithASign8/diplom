import React, { FC } from "react";
import {Button, Card, Group, Rating, Text} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconUserCircle} from "@tabler/icons-react";
import {Review} from "../../../shared/api/queries";
import {useMutation, useQueryClient} from "react-query";
import {ApprovalReview} from "../../../shared/api/queries/review/approvalReview";
import {showNotification} from "@mantine/notifications";
import {removeReview} from "../../../shared/api/queries/review/removeReview";

interface CommentCardInterface {
  landing?: boolean;
  maxWidth: number;
  reviewData: Review;
  adminPanel?: boolean
}
export const CommentCard: FC<CommentCardInterface> = ({landing, maxWidth, reviewData, adminPanel}) => {
    const queryClient = useQueryClient()
    const mutationApprovalReview = useMutation(() => ApprovalReview('approved', reviewData?.id), {
        onSuccess: () => queryClient.invalidateQueries(['getAllReviewsForAdmin'])
    })
    const mutationRejectedReview = useMutation(() => removeReview(reviewData?.id), {
        onSuccess: () => queryClient.invalidateQueries(['getAllReviewsForAdmin'])
    })
    const Approval = async () => {
         try{
             mutationApprovalReview.mutate()
             showNotification({
                 id: "load-data",
                 title: "Одобрение отзыва",
                 message: `Отзыв №${reviewData?.id} одобрен!`,
                 autoClose: true,
                 radius: "xl",
                 fw: 500,
                 icon: <IconCheck size="1rem" />,
             });
         }catch (e){
             showNotification({
                 id: "load-data",
                 title: "Ошибка",
                 message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
                 autoClose: true,
                 radius: "xl",
                 fw: 500,
                 icon: <IconAlertCircle size='1rem'/>
             });
         }
    }
    const Rejected = async () => {
        try{
            mutationRejectedReview.mutate()
            showNotification({
                id: "load-data",
                title: "Удаление отзыва",
                message: `Отзыв №${reviewData?.id} отклонен!`,
                autoClose: true,
                radius: "xl",
                fw: 500,
                icon: <IconCheck size="1rem" />,
            });
        }catch (e){
            showNotification({
                id: "load-data",
                title: "Ошибка",
                message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
                autoClose: true,
                radius: "xl",
                fw: 500,
                icon: <IconAlertCircle size='1rem'/>
            });
        }
    }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={maxWidth}>
      <Group position={"apart"}>
        <Group>
            {reviewData?.user.role === 'USER' && <>{!landing && <IconUserCircle size={35} />}
                <Text td={"underline"} weight={700} size={20}>
                    {reviewData?.user.email}
                </Text></>}
            <Text size={20} c="dimmed">{reviewData?.user.role === 'ADMIN' && 'Администрация'}</Text>
        </Group>
          {reviewData?.user.role !== 'ADMIN' && <Group>
              {!landing && <Text size={20}>Оценка:</Text>}
              <Rating value={reviewData?.rating} fractions={2} size={"md"} readOnly />
          </Group>}
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{reviewData?.title}</Text>
      </Group>
      <Text lineClamp={landing ? 2 : 0}>
        {reviewData?.description}
      </Text>
        {adminPanel && <Group>
            <Button color={'green'} onClick={() => Approval()}>Одобрить</Button>
            <Button color={'red'} onClick={() => Rejected()}>Отклонить</Button>
        </Group>}
    </Card>
  );
};
