import React from "react";
import {Button, Center, Group, SimpleGrid, Stack, Text} from "@mantine/core";
import PizzaCard from "../../../entities/pizza-card/ui/ui";
import DessertCard from "../../../entities/dessert-card/ui/ui";
import DrinkCard from "../../../entities/drink-card/ui/ui";

export const CartLayout = () => {
  return (
    <div>
      <Center mt={"5%"}>
        <Group position={"apart"} w={600}>
            <Text size={40} >
                Моя корзина
            </Text>
            <Button color={'red'}>Очистить корзину</Button>
        </Group>
      </Center>
      <Center mt={'3%'}>
        <Stack sx={() => ({
            display: 'flex'
        })}>
          <PizzaCard landing={false} commerce={false} toCard={true} />
          <PizzaCard landing={false} commerce={false} toCard={true} />
          <DessertCard landing={false} commerce={false} toCard={true} />
          <DessertCard landing={false} commerce={false} toCard={true} />
          <DrinkCard landing={false} commerce={false} toCard={true} />
          <DrinkCard landing={false} commerce={false} toCard={true} />
        </Stack>
      </Center>
    </div>
  );
};
