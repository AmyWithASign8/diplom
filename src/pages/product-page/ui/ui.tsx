import React from "react";
import { Center, Group, Input, Select, SimpleGrid, Tabs } from "@mantine/core";
import {
  IconBottle,
  IconCake,
  IconPizza,
  IconSearch,
} from "@tabler/icons-react";
import PizzaCard from "../../../features/pizza-card/ui/ui";
import DessertCard from "../../../features/dessert-card/ui/ui";
import DrinkCard from "../../../features/drink-card/ui/ui";

export const ProductLayout = () => {
  return (
    <div>
      <Tabs color="orange" defaultValue="gallery" mt={100}>
        <Tabs.List ml={10}>
          <Tabs.Tab value="gallery" icon={<IconPizza size="0.8rem" />}>
            Пиццы
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconCake size="0.8rem" />}>
            Десерты
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconBottle size="0.8rem" />}>
            Напитки
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <Group position={"center"}>
            <Input
              icon={<IconSearch />}
              placeholder="Введите название пиццы"
              sx={() => ({
                width: 300,
              })}
            />
            <Select
              clearable
              placeholder="Выберите фильтр цены"
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
            <SimpleGrid
              cols={5}
              mt={100}
              mr={100}
              ml={100}
              spacing={"xl"}
              mb={100}
            >
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
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <Group position={"center"}>
            <Input
              icon={<IconSearch />}
              placeholder="Введите название десерта"
              sx={() => ({
                width: 300,
              })}
            />
            <Select
              clearable
              placeholder="Выберите фильтр цены"
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
          </Group>
          <Center>
            <SimpleGrid
              cols={5}
              mt={100}
              mr={100}
              ml={100}
              spacing={"xl"}
              mb={100}
            >
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
              <DessertCard landing={false} commerce={true} />
            </SimpleGrid>
          </Center>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <Group position={"center"}>
            <Input
              icon={<IconSearch />}
              placeholder="Введите название напитка"
              sx={() => ({
                width: 300,
              })}
            />
            <Select
              clearable
              placeholder="Выберите фильтр цены"
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
              placeholder="Выберите тип напитка"
              data={[
                { value: "Горячие", label: "Горячие" },
                { value: "Холодные", label: "Холодные" },
                { value: "Соки", label: "Соки" },
                { value: "Газированные", label: "Газированные" },
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
            <SimpleGrid
              cols={5}
              mt={100}
              mr={100}
              ml={100}
              spacing={"xl"}
              mb={100}
            >
              <DrinkCard landing={false} commerce={true} />
              <DrinkCard landing={false} commerce={true} />
              <DrinkCard landing={false} commerce={true} />
              <DrinkCard landing={false} commerce={true} />
              <DrinkCard landing={false} commerce={true} />
              <DrinkCard landing={false} commerce={true} />
              <DrinkCard landing={false} commerce={true} />
            </SimpleGrid>
          </Center>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};