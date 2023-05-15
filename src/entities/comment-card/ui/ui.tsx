import React, { FC } from "react";
import { Card, Group, Rating, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

interface CommentCardInterface {
  landing: boolean;
  maxWidth: number;
}
export const CommentCard: FC<CommentCardInterface> = (props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={props.maxWidth}>
      <Group position={"apart"}>
        <Group>
          {!props.landing && <IconUserCircle size={35} />}
          <Text td={"underline"} weight={700} size={20}>
            Данил Бычков
          </Text>
        </Group>
        <Group>
          {!props.landing && <Text size={20}>Оценка:</Text>}
          <Rating value={5} fractions={2} size={"md"} readOnly />
        </Group>
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Очень хороший сайт!</Text>
      </Group>
      <Text lineClamp={props.landing ? 10 : 0}>
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
        asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas
      </Text>
    </Card>
  );
};
