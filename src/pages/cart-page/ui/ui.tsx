import React from "react";
import {
    Alert,
    Button,
    Center,
    Group,
    Modal,
    SimpleGrid,
    Stack,
    Text,
    Title
} from "@mantine/core";
import {IconAlertCircle, IconArrowNarrowLeft, IconCheck, IconCreditCard, IconShoppingCartX} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {clearBasket, useGetBasket} from "../../../shared/api/queries";
import {Link, useParams} from "react-router-dom";
import PizzaCard from "../../../entities/pizza-card/ui/ui";
import DrinkCard from "../../../entities/drink-card/ui/ui";
import DessertCard from "../../../entities/dessert-card/ui/ui";
import {useMutation, useQueryClient} from "react-query";
import {showNotification} from "@mantine/notifications";
import {createOrder} from "../../../shared/api/queries/orders";
import {useScreenSize} from "../../../shared/hooks";
import {Breakpoints} from "../../../shared/types";

export const CartLayout = () => {
    const currentScreenSize = useScreenSize()
    const queryClient = useQueryClient()
    const {userId} = useParams()
    if (!userId) return null
    const {data, isSuccess} = useGetBasket(userId)
    const [opened, { open, close }] = useDisclosure(false);
    const sum = (obj: any) => {
        let result = 0;
        for (let i = 0; i < obj.length; i++) {
            result += obj[i].price;
        }
        return result;
    }
    const mutateClearBasket = useMutation(() => clearBasket(userId), {
        onSuccess: () => queryClient.invalidateQueries(['getOneBasket'])
    })
    const clearAllBasketProducts = async () => {
        try{
            showNotification({
                id: "load-data",
                title: "Очистка корзины",
                message: `Корзина очищена!`,
                autoClose: true,
                radius: "xl",
                icon: <IconCheck size="1rem" />,
            });
            mutateClearBasket.mutate()
            close()
        }catch (e) {
            showNotification({
                id: "load-data",
                title: "Ошибка",
                message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
                autoClose: true,
                radius: "xl",
                icon: <IconAlertCircle/>
            });
        }
    }
    if (!data) return null
        const createOrderFunc = async () => {
            try {
                const response = await createOrder(sum(data['basket-products']), userId)
                showNotification({
                    id: "load-data",
                    title: "Создание заказа",
                    message: `Ваш заказ создан!`,
                    autoClose: true,
                    radius: "xl",
                    icon: <IconCheck size="1rem" />,
                });
                await clearAllBasketProducts()
            }catch (e) {
                showNotification({
                    id: "load-data",
                    title: "Ошибка",
                    message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
                    autoClose: true,
                    radius: "xl",
                    icon: <IconAlertCircle/>
                });
            }
        }
  if (!isSuccess) return null
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Очистить корзину" centered>
        <Text>Вы уверены что хотите очистить корзину?</Text>
        <Group position={"center"} mt={"5%"}>
          <Button color={"green"} variant={"light"} onClick={() => clearAllBasketProducts()}>
            Да
          </Button>
          <Button color={"red"} variant={"light"} onClick={close}>
            Отмена
          </Button>
        </Group>
      </Modal>
      <Center mt={currentScreenSize < Breakpoints.md ? "15%" : currentScreenSize < Breakpoints.lg ? "10%" : "5%"}>
        <Group position={"apart"} w={600}>
          <Text size={currentScreenSize < Breakpoints.md ? 20 : currentScreenSize < Breakpoints.lg ? 30 : 40}>Моя корзина</Text>
          {data['basket-products'].length !== 0 && <Button color={"red"} onClick={open}>
            Очистить корзину
          </Button>}
        </Group>
      </Center>
            <Stack mt={'2%'}>
                {data['basket-products'].length === 0 &&
                    <Center>
                        <Stack maw={'40%'}>
                            <Group>
                                <IconShoppingCartX size={currentScreenSize < Breakpoints.lg ? '20%' : '40%'} stroke={1}/>
                                {currentScreenSize < Breakpoints.lg ? <Text fw={500} size={currentScreenSize < Breakpoints.sm ? 15 : 20}>Ваша корзина пуста!</Text> : <Title>Ваша корзина пуста!</Title>}
                            </Group>
                            <Button color={'orange'} leftIcon={<IconArrowNarrowLeft/>} component={Link} to={'/catalog'} fullWidth>В каталог</Button>
                        </Stack>
                    </Center>}
                {data['basket-products'].map((obj) => (
                    obj.product.brandId === 1 ? <PizzaCard productData={''} cartData={obj} landing={false} commerce={false} toCard={true} /> : obj.product.brandId === 2 ? <DrinkCard productData={''} cartData={obj} landing={false} commerce={false} toCard={true}/> : <DessertCard productData={''} cartData={obj} landing={false} commerce={false} toCard={true}/>
                ))}
            </Stack>
      <Group position={'center'} mt={'2%'}>
        {data["basket-products"].length !== 0 && <>
          <Group>
            <Text size={25}>Итоговая сумма:</Text>
            <Text size={26}>{sum(data['basket-products'])} RUB</Text>
          </Group>
          <Button leftIcon={<IconCreditCard />} color={"green"} onClick={() => createOrderFunc()}>
            Заказать
          </Button></>}
      </Group>
        <Center mt={'2%'}>
            <Alert w={'40%'} icon={<IconAlertCircle size="1rem" />} title="Внимание!" color="orange" variant={'filled'}>
                Оплата при получении товара, забрать можно в течении часа по адресу ул. Менделеева, 169, Уфа, Респ. Башкортостан, 450022 , чтобы узнать готов ли ваш заказ напишите нам на почту или спросите продавца в пункте выдачи.
            </Alert>
        </Center>
    </div>
  );
};
