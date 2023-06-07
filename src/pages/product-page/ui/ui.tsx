import React from "react";
import {Alert, Center, Group, Input, Select, SimpleGrid, Tabs} from "@mantine/core";
import {
  IconAlertCircle,
  IconBottle,
  IconCake,
  IconPizza,
  IconSearch,
} from "@tabler/icons-react";
import PizzaCard from "../../../entities/pizza-card/ui/ui";
import DessertCard from "../../../entities/dessert-card/ui/ui";
import DrinkCard from "../../../entities/drink-card/ui/ui";
import {useGetAllProducts, useGetAllTypes} from "../../../shared/api/queries";

export const ProductLayout = () => {
  const [checkByPrice, setCheckByPrice] = React.useState<string | null>(null)
  const [searchInput, setSearchInput] = React.useState<string>('')
  const {data, isSuccess, error} = useGetAllProducts('', 'none', 'none')
  const {data: dataType, isSuccess: isSuccessType} = useGetAllTypes()
  let newDataType: any = []
  if (!isSuccess) return null
  if (!isSuccessType) return null
  dataType.map((obj) => obj.brandId === 1 && newDataType.push(obj))
  if (error) return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
        Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
      </Alert>
  )
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
                value={checkByPrice}
                onChange={(value) => setCheckByPrice(value)}
              clearable
              placeholder="Выберите фильтр цены"
              data={[
                { value: "ASC", label: "Сначала дешевые" },
                { value: "DESC", label: "Сначала дорогие" },
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
              data={newDataType.map((obj: any) => ({value: `${obj.id}`, label: `${obj.name}`}))}
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
