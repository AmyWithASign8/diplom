import React from "react";
import { Center, Group, Input, Select, SimpleGrid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import PizzaCard from "../../../features/pizza-card/ui/ui";

export const ProductLayout = () => {
  return (
    <div>
      <Group mt={100} position={"center"}>
        <Input
          icon={<IconSearch />}
          placeholder="Введите название пиццы"
          sx={() => ({
            width: 300,
          })}
        />
        <Select
          clearable
          placeholder="Выберите тип пиццы"
          data={[
            { value: "Сначала дешевые", label: "Сначала дешевые" },
            { value: "Сначала дорогие", label: "Сначала дорогие" },
          ]}
          styles={(theme) => ({
            item: {
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.orange[9]
                      : theme.colors.orange[1],
                  color:
                    theme.colorScheme === "dark"
                      ? theme.white
                      : theme.colors.orange[9],
                },
              },
            },
          })}
        />
        <Select
          clearable
          placeholder="Выберите тип пиццы"
          data={[
            { value: "Мясные", label: "Мясные" },
            { value: "Вегатарианские", label: "Вегатарианские" },
            { value: "Сырные", label: "Сырные" },
            { value: "Бербекью", label: "Бербекью" },
          ]}
          styles={(theme) => ({
            item: {
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.orange[9]
                      : theme.colors.orange[1],
                  color:
                    theme.colorScheme === "dark"
                      ? theme.white
                      : theme.colors.orange[9],
                },
              },
            },
          })}
        />
      </Group>
      <Center>
        <SimpleGrid cols={5} mt={100} mr={100} ml={100} spacing={"xl"} mb={100}>
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
          <PizzaCard landing={false} commerce={true} />
        </SimpleGrid>
      </Center>
    </div>
  );
};
