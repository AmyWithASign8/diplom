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
import {useStore} from "effector-react/compat";
import {$user} from "../../../app/models/userStore";
import {Link, useParams} from "react-router-dom";

export const CartLayout = () => {
  const user = useStore($user)
  const {userId} = useParams()
  if (!userId) return null
  const {data, isSuccess} = useGetBasket(userId)
  console.log(data)
  const [opened, { open, close }] = useDisclosure(false);
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
          {/*{data.map((obj) => (*/}
          {/*    obj.brandId === 1 && <PizzaCard productData={obj} landing={false} commerce={false} toCard={true} />*/}
          {/*))}*/}
        </SimpleGrid>
      </Center>
      <Group mt={"4%"} ml={"25%"} position={"apart"} w={"50%"}>
        {data["basket-products"].length !== 0 && <>
          <Group>
            <Text size={25}>Итоговая сумма:</Text>
            <Text size={26}>1000 RUB</Text>
          </Group>
          <Button leftIcon={<IconCreditCard />} color={"green"}>
            Оплатить
          </Button></>}
      </Group>
    </div>
  );
};
