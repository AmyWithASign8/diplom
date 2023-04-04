import React from "react";
import {Center, SimpleGrid, Stack, Text} from "@mantine/core";
import PizzaCard from "../../../entities/pizza-card/ui/ui";
import DessertCard from "../../../entities/dessert-card/ui/ui";
import DrinkCard from "../../../entities/drink-card/ui/ui";

export const CartLayout = () => {
  return (
    <div>
      <Center>
        <Text size={40} mt={"5%"}>
          Моя корзина
        </Text>
      </Center>
      <Center>
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
