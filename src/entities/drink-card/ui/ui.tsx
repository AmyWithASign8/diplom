import React, { FC } from "react";
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconShoppingCart, IconTrash} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { CardInterface } from "../../pizza-card";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "effector-react/compat";
import { $isAuth } from "../../../app/models/isAuthStore";
import {useCreateBasketProduct} from "../../../shared/api/queries";
import {deleteBasketProduct} from "../../../shared/api/queries";
import {showNotification} from "@mantine/notifications";
import {$user} from "../../../app/models/userStore";
import {useMutation, useQueryClient} from "react-query";

const DrinkCard: FC<CardInterface> = ({productData, toCard, landing, commerce, cartData}) => {
  const queryClient = useQueryClient()
  const user = useStore($user)
  const isAuth = useStore($isAuth);
  const [opened, { open, close }] = useDisclosure(false);
  const currentTheme = useMantineTheme();
  const mutation = useMutation(() => deleteBasketProduct(cartData?.id), {
    onSuccess: () => queryClient.invalidateQueries(['getOneBasket'])
  })
  const createBasketProduct = async () => {
    try {
      showNotification({
        id: "load-data",
        title: "Добавление товара в корзину",
        message: `Товар «${productData.title}» успешно добавлен в корзину!`,
        autoClose: true,
        radius: "xl",
        icon: <IconCheck size="1rem" />,
      });
      await useCreateBasketProduct(productData.title, productData.description, productData.price, user?.id, productData.id)
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
  return (
    <div>
      {isAuth ? (
        <Modal
          opened={opened}
          onClose={close}
          title="Добавление товара в корзину"
          centered
          size={"60%"}
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
              <Stack justify={"flex-start"} mb={"80%"}>
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
                <Badge variant={"light"} color={"orange"}>
                  {productData?.additional}
                </Badge>
              </Stack>
              <Stack>
                <Text size={20} fw={500}>
                  Итоговая стоимость: {productData.price} RUB
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
              <Text size={15}>{cartData?.product.additional}</Text>
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
                  {productData.price} RUB
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

export default DrinkCard;
