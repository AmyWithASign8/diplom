import React, { FC } from "react";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface DessertCardInterface {
  landing: boolean | undefined;
  commerce: boolean | undefined;
}
const DessertCard: FC<DessertCardInterface> = (props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          height={300}
          width={300}
          src="https://dodopizza-a.akamaihd.net/static/Img/Products/aaaf00a849a14804ba9264dc7838021e_292x292.webp"
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text size={18} fw={500}>
          Сырники с малиновым вареньем
        </Text>
      </Group>
      <Text maw={260} size={14}>
        Любимый десерт многих наших гостей — румяные сырники из печи. Такие
        нежные, в меру сладкие и напоминающие детство
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
              Десерт
            </Badge>
            <Badge
              sx={() => ({
                textTransform: "none",
              })}
              size={"lg"}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              289 RUB
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

export default DessertCard;
