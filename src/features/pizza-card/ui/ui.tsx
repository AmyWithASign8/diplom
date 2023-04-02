import React, { FC } from "react";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface PizzaCardInterface {
  landing: boolean | undefined;
  commerce: boolean | undefined;
}
const PizzaCard: FC<PizzaCardInterface> = (props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          height={300}
          width={300}
          src="https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg"
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text size={18} fw={500}>
          Пепперони Фреш с перцем
        </Text>
      </Group>
      <Text maw={260} size={14}>
        Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный
        томатный соус
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
              Тип пиццы
            </Badge>
            <Badge
              sx={() => ({
                textTransform: "none",
              })}
              size={"lg"}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              от 500 RUB
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

export default PizzaCard;