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
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "effector-react/compat";
import { $isAuth } from "../../../app/models/isAuthStore";
import {Product} from "../../../shared/api/queries/product/useGetAllProducts";

export interface CardInterface {
  landing: boolean | undefined;
  commerce: boolean | undefined;
  toCard: boolean;
  productData: Product
}
const PizzaCard: FC<CardInterface> = ({landing, commerce, toCard, productData}) => {
  const isAuth = useStore($isAuth);
  const [countProduct, setCountProduct] = React.useState<number>(1);
  const plusOrMinusCount = (a: string) => {
    if (a === "+") setCountProduct(countProduct + 1);
    else if (countProduct === 1) setCountProduct(countProduct);
    else setCountProduct(countProduct - 1);
  };
  const [opened, { open, close }] = useDisclosure(false);
  const [valueOfSize, setValueOfSize] = React.useState<string>("medium");
  const [valueOfPastry, setValueOfPastry] =
    React.useState<string>("traditional");
  React.useEffect(() => {
    if (valueOfSize === "small") setValueOfPastry("traditional");
  }, [valueOfSize]);
  const currentTheme = useMantineTheme();
  if (productData === undefined) return null
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
                    {valueOfSize === "small"
                      ? "25"
                      : valueOfSize === "medium"
                      ? "30"
                      : "35"}{" "}
                    см.
                  </Badge>
                  <Badge color={"orange"}>
                    {valueOfPastry === "traditional"
                      ? "традиционное"
                      : "тонкое"}{" "}
                    тесто
                  </Badge>
                </Group>
                <Chip.Group
                  multiple={false}
                  value={valueOfSize}
                  onChange={setValueOfSize}
                >
                  <Group position="center">
                    <Chip color="orange.5" variant="filled" value="small">
                      Маленькая
                    </Chip>
                    <Chip color="orange.7" variant="filled" value="medium">
                      Средняя
                    </Chip>
                    <Chip color="orange.9" variant="filled" value="big">
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
                    <Chip color="orange.8" variant="filled" value="traditional">
                      Традиционное
                    </Chip>
                    <Chip
                      color="orange.6"
                      variant="filled"
                      value="thin"
                      disabled={valueOfSize === "small"}
                    >
                      Тонкое
                    </Chip>
                  </Group>
                </Chip.Group>
              </Stack>
              <Stack>
                <Text size={20} fw={500}>
                  Итоговая стоимость:{" "}
                  {valueOfSize === "medium"
                    ? productData.price * 1.5
                    : valueOfSize === "small"
                    ? productData.price
                    : productData.price * 2}{" "}
                  RUB
                </Text>
                <Button
                  radius={"xl"}
                  leftIcon={<IconShoppingCart />}
                  color="orange"
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
              src="https://dodopizza-a.akamaihd.net/static/Img/Products/b3e4267e06334a428dcc9f1f10a72f34_292x292.webp"
              alt="Norway"
            />
            <Stack>
              <Text size={20} w={255}>
                Пепперони Фреш с перцем
              </Text>
              <Text size={15}>Средняя, 30 см, традиционное тесто</Text>
            </Stack>
          </Group>
          <Group>
            <Button onClick={() => plusOrMinusCount("-")} color={"orange"}>
              -
            </Button>
            <Text
              variant="gradient"
              gradient={{ from: "yellow", to: "orange", deg: 45 }}
              size={"lg"}
              fw={700}
            >
              {countProduct}
            </Text>
            <Button onClick={() => plusOrMinusCount("+")} color={"orange"}>
              +
            </Button>
          </Group>

          <Text size={20}>777 RUB</Text>
          <Button
            variant={"light"}
            leftIcon={<IconTrash />}
            color={"red"}
            bg={currentTheme.colorScheme === "light" ? "rgba(0, 0, 0, 0)" : ""}
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
