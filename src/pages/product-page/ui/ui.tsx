import React from "react";
import {Center, Group, Input, Select, SimpleGrid, Tabs} from "@mantine/core";
import {
  IconBottle,
  IconCake,
  IconPizza,
  IconSearch,
} from "@tabler/icons-react";
import PizzaCard from "../../../entities/pizza-card/ui/ui";
import DessertCard from "../../../entities/dessert-card/ui/ui";
import DrinkCard from "../../../entities/drink-card/ui/ui";
import {useGetAllProducts} from "../../../shared/api/queries";

export const ProductLayout = () => {
  const {data, isSuccess} = useGetAllProducts()
  console.log(data)
  if (!isSuccess) return null
  return (
    <div>

      <Tabs
        orientation="vertical"
        color="orange"
        defaultValue="pizzas"
        mt={100}
      >
        <Tabs.List ml={10}>
          <Tabs.Tab value="pizzas" icon={<IconPizza size="28" />} sx={() => ({
            fontSize: 18
          })}>
            Пиццы
          </Tabs.Tab>
          <Tabs.Tab value="desserts" icon={<IconCake size="28" />} sx={() => ({
            fontSize: 18
          })}>
            Десерты
          </Tabs.Tab>
          <Tabs.Tab value="drinks" icon={<IconBottle size="28" />} sx={() => ({
            fontSize: 18
          })}>
            Напитки
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pizzas" pt="xs">
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
              {data.map((obj) => (
                  obj.brandId === 1 && <PizzaCard productData={obj} landing={false} commerce={true} toCard={false}/>
              ))}
            </SimpleGrid>
          </Center>
        </Tabs.Panel>

        <Tabs.Panel value="desserts" pt="xs">
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
              {data.map((obj) => (
                  obj.brandId === 3 && <DessertCard productData={obj} landing={false} commerce={true} toCard={false}/>
              ))}
            </SimpleGrid>
          </Center>
        </Tabs.Panel>

        <Tabs.Panel value="drinks" pt="xs">
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
              {data.map((obj) => (
                  obj.brandId === 2 && <DrinkCard productData={obj} landing={false} commerce={true} toCard={false}/>
              ))}
            </SimpleGrid>
          </Center>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
