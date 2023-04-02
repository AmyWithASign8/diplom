import React, { FC } from "react";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface DrinkCardInterface {
  landing: boolean | undefined;
  commerce: boolean | undefined;
}
const DrinkCard: FC<DrinkCardInterface> = (props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          height={300}
          width={300}
          src="https://dodopizza-a.akamaihd.net/static/Img/Products/b3e4267e06334a428dcc9f1f10a72f34_292x292.webp"
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text size={18} fw={500}>
          Кофе Американо
        </Text>
      </Group>
      <Text maw={260} size={14}>
        Пара глотков горячего Американо, и вы будете готовы покорять этот день
      </Text>
      {props.landing && (
        <Button
          component={Link}
          to={"/catalog"}
          leftIcon={<IconShoppingCart />}
          variant="light"
          color="orange"
          fullWidth
          mt="md"
          radius="md"
        >
          Каталог
        </Button>
      )}
      {props.commerce && (
        <div>
          <Group position={"center"} mt={"5%"}>
            <Badge
              sx={() => ({
                textTransform: "none",
              })}
              size={"lg"}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              Тип напитка
            </Badge>
            <Badge
              sx={() => ({
                textTransform: "none",
              })}
              size={"lg"}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              99 RUB
            </Badge>
          </Group>
          <Button
            leftIcon={<IconShoppingCart />}
            variant="light"
            color="orange"
            fullWidth
            mt="md"
            radius="md"
          >
            В корзину
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DrinkCard;
