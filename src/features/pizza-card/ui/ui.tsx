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
          height={250}
          width={250}
          src="https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg"
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Пепперони Фреш с перцем</Text>
      </Group>
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
          <Group position={"right"}>
            <Badge
              size={"lg"}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              Тип пиццы
            </Badge>
            <Badge
              size={"lg"}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              500 RUB
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
