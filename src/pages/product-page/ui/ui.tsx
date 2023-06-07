import React from "react";
import {Alert, Center, Group, Input, Loader, Select, SimpleGrid, Tabs, TextInput, Text, Divider} from "@mantine/core";
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
import {useGetAllBrands, useGetAllProducts, useGetAllTypes} from "../../../shared/api/queries";
import {useStore} from "effector-react/compat";
import {$productListFilter, setBrand, setPrice, setSearchQuery, setType} from "../model/product-list-type";
import {useDebouncedState} from "@mantine/hooks";

export const ProductLayout = () => {
  const {query, typeId, byPrice, brandId} = useStore($productListFilter)
  const [checkByPrice, setCheckByPrice] = React.useState<any>('none')
  const [checkByType, setCheckByType] = React.useState<any>('none')
  const [checkByBrand, setCheckByBrand] = React.useState<any>('none')
  const [searchValue, setSearchValue] = useDebouncedState('', 1000);
  const {data, isSuccess, error, isLoading} = useGetAllProducts(query, typeId, byPrice, brandId)
  React.useEffect(() => {
    setSearchQuery({queryString: searchValue})
    setPrice({byPrice: checkByPrice})
    setBrand({brandId: checkByBrand})
    setType({typeId: checkByType})
  },[searchValue, checkByPrice, checkByType, checkByBrand])
  const {data: dataType, isSuccess: isSuccessType} = useGetAllTypes()
  const {data: dataBrand, isSuccess: isSuccessBrand} = useGetAllBrands()
  if (isLoading) return <Center mt={'10%'} mb={'20%'}><Loader color="orange" size="xl" /></Center>
  if (!isSuccess || !isSuccessType || !isSuccessBrand) return <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
    Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
  </Alert>
  if (error) return <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
        Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
      </Alert>


  return (
    <div>
          <Group position={"center"} mt={'5%'}>
            <TextInput
                label={'Поиск...'}
              icon={<IconSearch />}
              defaultValue={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              placeholder="Введите название продукта"
              sx={() => ({
                width: 300,
              })}
            />
            <Select
                label={'Фильтр цены'}
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
                label={'Фильтр вида продукта'}
                value={checkByBrand}
                onChange={(value) => setCheckByBrand(value)}
              clearable
              placeholder="Выберите вид продукта"
              data={dataBrand.map((obj: any) => ({value: `${obj.id}`, label: `${obj.name}`}))}
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
                label={'Фильтр типа продукта'}
                value={checkByType}
                onChange={(value) => setCheckByType(value)}
                clearable
                placeholder="Выберите тип продукта"
                data={dataType.map((obj: any) => ({value: `${obj.id}`, label: `${obj.name}`}))}
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
      {data.length === 0 ? <Center mt={'10%'} mb={'15%'}><Text size={'xl'}>К сожалению ничего не удалось найти :(</Text></Center> : <>
        <Center>
          <SimpleGrid
              cols={4}
              mt={100}
              mr={100}
              ml={100}
              spacing={"xl"}
              mb={100}
          >
            {data.map((obj) => (
                obj.brandId === 1 ? <PizzaCard productData={obj} landing={false} commerce={true} toCard={false}/> : obj.brandId === 3 ? <DessertCard productData={obj} landing={false} commerce={true} toCard={false}/> : <DrinkCard productData={obj} landing={false} toCard={false} commerce={true}/>
            ))}

          </SimpleGrid>
        </Center>
      </>}
    </div>
  );
};
