import React, { FC } from "react";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export interface CardInterface {
  landing: boolean | undefined;
  commerce: boolean | undefined;
  toCard: boolean;
}
const PizzaCard: FC<CardInterface> = (props) => {
  const [countProduct, setCountProduct] = React.useState<number>(1);
  const plusOrMinusCount = (a: string) => {
    if (a === "+") setCountProduct(countProduct + 1);
    else if (countProduct === 1) setCountProduct(countProduct);
    else setCountProduct(countProduct - 1);
  };
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
      {!props.toCard && (
        <Text maw={260} size={14}>
          Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный
          томатный соус
        </Text>
      )}
      {props.toCard && (
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
              500 RUB
            </Badge>
          </Group>
          <Group position={"center"} mt={"5%"}>
            <Button onClick={() => plusOrMinusCount("-")} color={"orange"}>
              -
            </Button>
            <Text
              variant="gradient"
              gradient={{ from: "yellow", to: "orange", deg: 45 }}
              size={"lg"}
              fw={700}
            >
              {countProduct}
            </Text>
            <Button onClick={() => plusOrMinusCount("+")} color={"orange"}>
              +
            </Button>
            <Button leftIcon={<IconTrash />} color={"red"}>
              Удалить
            </Button>
          </Group>
        </div>
      )}
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
