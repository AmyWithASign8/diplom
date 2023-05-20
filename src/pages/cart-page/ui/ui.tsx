import React from "react";
import {
  Button,
  Center,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
    Title
} from "@mantine/core";
import {IconArrowNarrowLeft, IconCreditCard, IconShoppingCartX} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {useGetBasket} from "../../../shared/api/queries";
import {Link, useParams} from "react-router-dom";
import PizzaCard from "../../../entities/pizza-card/ui/ui";
import DrinkCard from "../../../entities/drink-card/ui/ui";
import DessertCard from "../../../entities/dessert-card/ui/ui";

export const CartLayout = () => {
  const {userId} = useParams()
  if (!userId) return null
  const {data, isSuccess} = useGetBasket(userId)
  console.log(data)
  const [opened, { open, close }] = useDisclosure(false);
  const sum = (obj: any) => {
        var result = 0;

        for (var i = 0; i < obj.length; i++) {
            result += obj[i].price;
        }

        return result;
    }
  if (!isSuccess) return null
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Очистить корзину" centered>
        <Text>Вы уверены что хотите очистить корзину?</Text>
        <Group position={"center"} mt={"5%"}>
          <Button color={"green"} variant={"light"}>
            Да
          </Button>
          <Button color={"red"} variant={"light"} onClick={close}>
            Отмена
          </Button>
        </Group>
      </Modal>
      <Center mt={"5%"}>
        <Group position={"apart"} w={600}>
          <Text size={40}>Моя корзина</Text>
          {data['basket-products'].length !== 0 && <Button color={"red"} onClick={open}>
            Очистить корзину
          </Button>}
        </Group>
      </Center>
      <Center mt={"3%"}>
        <SimpleGrid cols={1}>
            {data['basket-products'].length === 0 &&
                <Stack>
                    <Center>
                        <IconShoppingCartX size={'80%'} stroke={1.5}/>
                        <Title>Ваша корзина пуста!</Title>
                    </Center>
                    <Button color={'orange'} leftIcon={<IconArrowNarrowLeft/>} component={Link} to={'/catalog'}>В каталог</Button>
                </Stack>}
            {data['basket-products'].map((obj) => (
                obj.product.brandId === 1 ? <PizzaCard productData={''} cartData={obj} landing={false} commerce={false} toCard={true} /> : obj.product.brandId === 2 ? <DrinkCard productData={''} cartData={obj} landing={false} commerce={false} toCard={true}/> : <DessertCard productData={''} cartData={obj} landing={false} commerce={false} toCard={true}/>
            ))}
        </SimpleGrid>
      </Center>
      <Group mt={"4%"} ml={"25%"} position={"apart"} w={"50%"}>
        {data["basket-products"].length !== 0 && <>
          <Group>
            <Text size={25}>Итоговая сумма:</Text>
            <Text size={26}>{sum(data['basket-products'])} RUB</Text>
          </Group>
          <Button leftIcon={<IconCreditCard />} color={"green"}>
            Оплатить
          </Button></>}
      </Group>
    </div>
  );
};
