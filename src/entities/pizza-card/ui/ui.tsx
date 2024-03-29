import React, { FC } from "react";
import {
  Badge, Box,
  Button,
  Card, Center,
  Chip,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconShoppingCart, IconTrash} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "effector-react/compat";
import { $isAuth } from "../../../app/models/isAuthStore";
import {Product} from "../../../shared/api/queries";
import {useCreateBasketProduct} from "../../../shared/api/queries";
import {$user} from "../../../app/models/userStore";
import {deleteBasketProduct} from "../../../shared/api/queries";
import {showNotification} from "@mantine/notifications";
import {useMutation, useQueryClient} from "react-query";
import {useScreenSize} from "../../../shared/hooks";
import {Breakpoints} from "../../../shared/types";

export interface CardInterface {
  landing: boolean | undefined;
  commerce: boolean | undefined;
  toCard: boolean;
  productData: Product | any,
  cartData?: {
    id: number
    title: string
    description: string
    size?: number
    paste?: string
    price: number
    product: {
      additional: string | null
      brandId: number
      createdAt: string
      description: string
      id: number
      image: string
      price: number
      title: string
      typeId: number
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
    basketId: number
    productId: number
  }
}
const PizzaCard: FC<CardInterface> = ({landing, commerce, toCard, productData, cartData}) => {
  const currentScreenSize = useScreenSize()
  const queryClient = useQueryClient()
  const user = useStore($user)
  const isAuth = useStore($isAuth);
  const [opened, { open, close }] = useDisclosure(false);
  const [valueOfSize, setValueOfSize] = React.useState<string>("30");
  const [valueOfPastry, setValueOfPastry] =
    React.useState<string>("традиционное");
  React.useEffect(() => {
    if (valueOfSize === "25") setValueOfPastry("традиционное");
  }, [valueOfSize]);
  const currentTheme = useMantineTheme();
  const mutation = useMutation(() => deleteBasketProduct(cartData?.id), {
    onSuccess: () => queryClient.invalidateQueries(['getOneBasket'])
  })
  const createBasketProduct = async () => {
    try {
      const response = await useCreateBasketProduct(productData.title, productData.description, currentPrice, user?.id, productData.id, valueOfSize, valueOfPastry)
      close()
      showNotification({
        id: "load-data",
        title: "Добавление товара в корзину",
        message: `Товар «${productData.title}» успешно добавлен в корзину!`,
        autoClose: true,
        radius: "xl",
        fw: 500,
        icon: <IconCheck size="2rem" />,
      });
    }catch (e) {
      showNotification({
        id: "load-data",
        title: "Ошибка",
        message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
        autoClose: true,
        radius: "xl",
        fw: 500,
        icon: <IconAlertCircle size="2rem"/>
      });
    }
  }
  const deleteProductFromBasket = async () => {
    try{
      mutation.mutate()
      showNotification({
        id: "load-data",
        title: "Удаление продукта",
        message: `${cartData?.title} успешно удален из корзины!`,
        autoClose: true,
        radius: "xl",
        fw: 500,
        icon: <IconCheck size="2rem" />,
      });
    }catch (e) {
      showNotification({
        id: "load-data",
        title: "Ошибка",
        message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
        autoClose: true,
        radius: "xl",
        fw: 500,
        icon: <IconAlertCircle size="2rem"/>
      });
    }
  }


  if (productData === undefined) return null
  const [currentPrice, setCurrentPrice] = React.useState<number>(productData.price)
  React.useEffect(() => {
    if (valueOfSize === '30') setCurrentPrice(productData.price * 1.5)
    else if (valueOfSize === '35') setCurrentPrice(productData.price * 2)
    else if (valueOfSize === '25') setCurrentPrice(productData.price)
  }, [valueOfSize])
  return (
    <div>
        <Modal
          opened={opened}
          onClose={close}
          title="Добавление товара в корзину"
          centered
          size={"50%"}
        >
          <Group position={'center'}>
            <Group maw={'100%'} position={'center'}>
              <Image
                  width={'100%'}
                  radius={20}
                  src={`http://localhost:5000/${productData.image}`}
                  alt="Norway"
              />
            </Group>
            <Group maw={'50%'}>
              <div>
                <Stack mb={"20%"}>
                  <Stack
                      p={"3%"}
                      sx={() => ({
                        borderRadius: 20,
                      })}
                      bg={
                        currentTheme.colorScheme === "light"
                            ? "rgba(0, 0, 0, 0.1)"
                            : "rgba(255, 255, 255, 0.1)"
                      }
                  >
                    <Text
                        size={'xl'}
                        fw={500}
                        color={
                          currentTheme.colorScheme === "light" ? "black" : "white"
                        }
                    >
                      {productData.title}
                    </Text>
                    <Text size={'lg'}>
                      {productData.description}
                    </Text>
                  </Stack>
                  <Group position={"center"}>
                    <Badge color={"orange"} variant={'outline'}>
                      {valueOfSize}{" "}
                      см.
                    </Badge>
                    <Badge color={"orange"} variant={'outline'}>
                      {valueOfPastry}{" "}
                      тесто
                    </Badge>
                  </Group>
                  <Chip.Group
                      multiple={false}
                      value={valueOfSize}
                      onChange={setValueOfSize}
                  >
                    <Group position="center">
                      <Chip color="orange.5" variant="filled" value="25">
                        Маленькая
                      </Chip>
                      <Chip color="orange.7" variant="filled" value="30">
                        Средняя
                      </Chip>
                      <Chip color="orange.9" variant="filled" value="35">
                        Большая
                      </Chip>
                    </Group>
                  </Chip.Group>
                  <Chip.Group
                      multiple={false}
                      value={valueOfPastry}
                      onChange={setValueOfPastry}
                  >
                    <Group position="center">
                      <Chip color="orange.8" variant="filled" value="традиционное">
                        Традиционное
                      </Chip>
                      <Chip
                          color="orange.6"
                          variant="filled"
                          value="тонкое"
                          disabled={valueOfSize === "25"}
                      >
                        Тонкое
                      </Chip>
                    </Group>
                  </Chip.Group>
                </Stack>
                <Stack>
                  <Text size='xl' fw={500}>
                    Итоговая стоимость:{" "}
                    {currentPrice}{" "}
                    RUB
                  </Text>

                  <Button
                      radius={"xl"}
                      leftIcon={<IconShoppingCart />}
                      color="orange"
                      onClick={() => createBasketProduct()}
                      disabled={!isAuth && true}
                  >
                    В корзину
                  </Button>
                  {!isAuth && <Text maw={300} color={'red'}>Чтобы добавить товар в корзину вам нужно авторизоваться!</Text>}
                </Stack>
              </div>
            </Group>
          </Group>
        </Modal>
      {toCard && (
        <Center>
          <Box w={1200} bg={
            currentTheme.colorScheme === "light"
                ? "rgba(0, 0, 0, 0.1)"
                : "rgba(255, 255, 255, 0.1)"
          }
               p={'3%'}
               sx={() => ({
                 borderRadius: 20,
               })}>
            {currentScreenSize < Breakpoints.md ? <Stack align={'center'}>
                  <Image
                      radius={20}
                      width={currentScreenSize < Breakpoints.lg ? 150 : '90%'}
                      src={`http://localhost:5000/${cartData?.product.image}`}
                      alt="Norway"
                  />
                  <Stack>
                    <Text size={currentScreenSize < Breakpoints.lg ? 'lg' : 'xl'}>
                      {cartData?.title}
                    </Text>
                    <Text size={currentScreenSize < Breakpoints.lg ? 'md' : 'lg'}>{cartData?.size === 30 ? 'Средняя' : cartData?.size === 25 ? 'Маленькая' : 'Большая'}, {cartData?.size} см, {cartData?.paste} тесто</Text>
                  </Stack>
                <Text fw={500} size={'lg'}>{cartData?.price} RUB</Text>
                <Button
                    variant={"light"}
                    leftIcon={<IconTrash />}
                    color={"red"}
                    bg={currentTheme.colorScheme === "light" ? "rgba(0, 0, 0, 0)" : ""}
                    onClick={() => deleteProductFromBasket()}
                >
                  Убрать
                </Button>
            </Stack> : <Group position={"apart"}>
              <Group>
                <Group>
                  <Image
                      radius={20}
                      width={currentScreenSize < Breakpoints.lg ? 150 : '90%'}
                      src={`http://localhost:5000/${cartData?.product.image}`}
                      alt="Norway"
                  />
                </Group>
                <Group>
                  <Stack>
                    <Text size={currentScreenSize < Breakpoints.lg ? 'lg' : 'xl'}>
                      {cartData?.title}
                    </Text>
                    <Text size={currentScreenSize < Breakpoints.lg ? 'md' : 'lg'}>{cartData?.size === 30 ? 'Средняя' : cartData?.size === 25 ? 'Маленькая' : 'Большая'}, {cartData?.size} см, {cartData?.paste} тесто</Text>
                  </Stack>
                </Group>
              </Group>
              <Group>
                <Text fw={500} size={'lg'}>{cartData?.price} RUB</Text>
                <Button
                    variant={"light"}
                    leftIcon={<IconTrash />}
                    color={"red"}
                    bg={currentTheme.colorScheme === "light" ? "rgba(0, 0, 0, 0)" : ""}
                    onClick={() => deleteProductFromBasket()}
                >
                  Убрать
                </Button>
              </Group>
            </Group>}
          </Box>
        </Center>
      )}
      {!toCard && (
        <Card shadow="xl" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Center>
              <Image
                  width={'100%'}
                  src={`http://localhost:5000/${productData.image}`}
                  alt="Norway"
              />
            </Center>
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text size={"lg"} fw={500}>
              {productData.title}
            </Text>
          </Group>
          <Text maw={'100%'} size={'md'} lineClamp={2}>
            {productData.description}
          </Text>
          {landing && (
            <Button
              component={Link}
              to={"/catalog"}
              leftIcon={<IconShoppingCart />}
              variant="light"
              color="orange"
              fullWidth
              mt="md"
              radius="md"
            >
              Каталог
            </Button>
          )}
          {commerce && (
            <div>
              <Group position={"center"} mt={"5%"}>
                <Badge
                  sx={() => ({
                    textTransform: "none",
                  })}
                  size={"lg"}
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  {productData.type.name}
                </Badge>
                <Badge
                  sx={() => ({
                    textTransform: "none",
                  })}
                  size={"lg"}
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  от {productData.price} RUB
                </Badge>
              </Group>
              <Button
                leftIcon={<IconShoppingCart />}
                variant="light"
                color="orange"
                fullWidth
                mt="md"
                radius="md"
                onClick={open}
              >
                В корзину
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default PizzaCard;
