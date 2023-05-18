import React, { FC } from "react";
import { Card, Group, Rating, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import {Review} from "../../../shared/api/queries/review/useGetAllReviews";

interface CommentCardInterface {
  landing?: boolean;
  maxWidth: number;
  reviewData?: Review;
}
export const CommentCard: FC<CommentCardInterface> = ({landing, maxWidth, reviewData}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={maxWidth}>
      <Group position={"apart"}>
        <Group>
          {!landing && <IconUserCircle size={35} />}
          <Text td={"underline"} weight={700} size={20}>
            {reviewData?.user.email}
          </Text>
            <Text size={20} c="dimmed">{reviewData?.user.role === 'ADMIN' && 'Администрация'}</Text>
        </Group>
        <Group>
          {!landing && <Text size={20}>Оценка:</Text>}
          <Rating value={reviewData?.rating} fractions={2} size={"md"} readOnly />
        </Group>
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{reviewData?.title}</Text>
      </Group>
      <Text lineClamp={landing ? 2 : 0}>
        {reviewData?.description}
      </Text>
    </Card>
  );
};
