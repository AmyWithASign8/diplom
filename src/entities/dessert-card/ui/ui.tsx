import React, { FC } from "react";
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconShoppingCart, IconTrash} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { CardInterface } from "../../pizza-card";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "effector-react/compat";
import { $isAuth } from "../../../app/models/isAuthStore";
import {useCreateBasketProduct} from "../../../shared/api/queries";
import {showNotification} from "@mantine/notifications";
import {deleteBasketProduct} from "../../../shared/api/queries";
import {$user} from "../../../app/models/userStore";
import {useMutation, useQueryClient} from "react-query";

const DessertCard: FC<CardInterface> = ({productData, toCard, landing, commerce, cartData}) => {
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
        fw: 500,
        icon: <IconCheck size="2rem" />,
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
        message: `${cartData?.title} успешно удален!`,
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
           <Group maw={'100%'}>
             <Image
                 radius={20}
                 width={'100%'}
                 src={`http://localhost:5000/${productData.image}`}
                 alt="Norway"
             />
           </Group>
            <Group maw={'50%'}>
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
                        size={'xl'}
                        fw={500}
                        color={
                          currentTheme.colorScheme === "light" ? "black" : "white"
                        }
                    >
                      {productData.title}
                    </Text>
                    <Text maw={'100%'} size={'lg'}>
                      {productData.description}
                    </Text>
                  </Stack>
                  <Badge color={"orange"} variant={"outline"}>
                    {productData?.additional}
                  </Badge>
                </Stack>
                <Stack>
                  <Text size={'xl'} fw={500}>
                    Итоговая стоимость: {productData.price} RUB
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
        <Group
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
              <Text size={20} maw={255}>
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
          {!toCard && (
            <Text maw={260} size={14} lineClamp={2}>
              {productData.description}
            </Text>
          )}
          {toCard && (
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
            </div>
          )}
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

export default DessertCard;
