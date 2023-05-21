import React, { FC } from "react";
import {
  Badge,
  Button,
  Card,
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
        icon: <IconCheck size="1rem" />,
      });
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
  const deleteProductFromBasket = async () => {
    try{
      mutation.mutate()
      showNotification({
        id: "load-data",
        title: "Удаление продукта",
        message: `${cartData?.title} успешно удален!`,
        autoClose: true,
        radius: "xl",
        icon: <IconCheck size="1rem" />,
      });
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


  if (productData === undefined) return null
  const [currentPrice, setCurrentPrice] = React.useState<number>(productData.price)
  React.useEffect(() => {
    if (valueOfSize === '30') setCurrentPrice(productData.price * 1.5)
    else if (valueOfSize === '35') setCurrentPrice(productData.price * 2)
    else if (valueOfSize === '25') setCurrentPrice(productData.price)
  }, [valueOfSize])
  return (
    <div>
      {isAuth ? (
        <Modal
          opened={opened}
          onClose={close}
          title="Добавление товара в корзину"
          centered
          size={"55%"}
        >
          <Group>
            <Image
              radius={20}
              height={500}
              width={500}
              src={`http://localhost:5000/${productData.image}`}
              alt="Norway"
            />
            <div>
              <Stack justify={"flex-start"} mb={"30%"}>
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
                    size={20}
                    fw={500}
                    color={
                      currentTheme.colorScheme === "light" ? "black" : "white"
                    }
                  >
                    {productData.title}
                  </Text>
                  <Text maw={400} size={14}>
                    {productData.description}
                  </Text>
                </Stack>
                <Group position={"center"}>
                  <Badge color={"orange"}>
                    {valueOfSize}{" "}
                    см.
                  </Badge>
                  <Badge color={"orange"}>
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
                      disabled={valueOfSize === "тонкое"}
                    >
                      Тонкое
                    </Chip>
                  </Group>
                </Chip.Group>
              </Stack>
              <Stack>
                <Text size={20} fw={500}>
                  Итоговая стоимость:{" "}
                  {currentPrice}{" "}
                  RUB
                </Text>
                <Button
                  radius={"xl"}
                  leftIcon={<IconShoppingCart />}
                  color="orange"
                  onClick={() => createBasketProduct()}
                >
                  В корзину
                </Button>
              </Stack>
            </div>
          </Group>
        </Modal>
      ) : (
        <Modal
          opened={opened}
          onClose={close}
          title="Добавление товара в корзину"
          centered
        >
          <Stack justify={"center"}>
            <Text size={20} fw={500}>
              Сначала авторизуйтесь!
            </Text>
            <Button color={"orange"} onClick={close}>
              Ок
            </Button>
          </Stack>
        </Modal>
      )}
      {toCard && (
        <Group
          w={1000}
          position={"apart"}
          bg={
            currentTheme.colorScheme === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)"
          }
          p={"3%"}
          sx={() => ({
            borderRadius: 20,
          })}
        >
          <Group>
            <Image
              radius={20}
              height={150}
              width={150}
              src={`http://localhost:5000/${cartData?.product.image}`}
              alt="Norway"
            />
            <Stack>
              <Text size={20} w={255}>
                {cartData?.title}
              </Text>
              <Text size={15}>{cartData?.size === 30 ? 'Средняя' : cartData?.size === 25 ? 'Маленькая' : 'Большая'}, {cartData?.size} см, {cartData?.paste} тесто</Text>
            </Stack>
          </Group>
          <Text size={20}>{cartData?.price} RUB</Text>
          <Button
            variant={"light"}
            leftIcon={<IconTrash />}
            color={"red"}
            bg={currentTheme.colorScheme === "light" ? "rgba(0, 0, 0, 0)" : ""}
            onClick={() => deleteProductFromBasket()}
          >
            Удалить
          </Button>
        </Group>
      )}
      {!toCard && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              height={300}
              width={300}
              src={`http://localhost:5000/${productData.image}`}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text size={18} fw={500}>
              {productData.title}
            </Text>
          </Group>
          <Text maw={260} size={14} lineClamp={2}>
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
