import React, { FC } from "react";
import {Badge, Button, Card, Group, Image, Stack, Text} from "@mantine/core";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { CardInterface } from "../../pizza-card";

const DessertCard: FC<CardInterface> = (props) => {
  const [countProduct, setCountProduct] = React.useState<number>(1);
  const plusOrMinusCount = (a: string) => {
    if (a === "+") setCountProduct(countProduct + 1);
    else if (countProduct === 1) setCountProduct(countProduct);
    else setCountProduct(countProduct - 1);
  };
  return (
    <div>
        {props.toCard &&
            <Group>
                <Image
                    radius={20}
                    height={150}
                    width={150}
                    src="https://dodopizza-a.akamaihd.net/static/Img/Products/aaaf00a849a14804ba9264dc7838021e_292x292.webp"
                    alt="Norway"
                />
                <Stack>
                    <Text size={20}>Сырники с малиновым вареньем</Text>
                    <Text size={15}>4 шт.</Text>
                </Stack>
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

                <Text size={20}>777 RUB</Text>
                <Button variant={'light'} leftIcon={<IconTrash />} color={"red"}>
                    Удалить
                </Button>
            </Group>
        }
        {!props.toCard &&
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        height={300}
                        width={300}
                        src="https://dodopizza-a.akamaihd.net/static/Img/Products/aaaf00a849a14804ba9264dc7838021e_292x292.webp"
                        alt="Norway"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text size={18} fw={500}>
                        Сырники с малиновым вареньем
                    </Text>
                </Group>
                {!props.toCard && (
                    <Text maw={260} size={14}>
                        Любимый десерт многих наших гостей — румяные сырники из печи. Такие
                        нежные, в меру сладкие и напоминающие детство
                    </Text>
                )}
                {props.toCard && (
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
                                Тип пиццы
                            </Badge>
                            <Badge
                                sx={() => ({
                                    textTransform: "none",
                                })}
                                size={"lg"}
                                variant="gradient"
                                gradient={{ from: "orange", to: "red" }}
                            >
                                500 RUB
                            </Badge>
                        </Group>
                        <Group position={"center"} mt={"5%"}>
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
                            <Button leftIcon={<IconTrash />} color={"red"}>
                                Удалить
                            </Button>
                        </Group>
                    </div>
                )}
                {props.landing && (
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
                {props.commerce && (
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
                                Десерт
                            </Badge>
                            <Badge
                                sx={() => ({
                                    textTransform: "none",
                                })}
                                size={"lg"}
                                variant="gradient"
                                gradient={{ from: "orange", to: "red" }}
                            >
                                289 RUB
                            </Badge>
                        </Group>
                        <Button
                            leftIcon={<IconShoppingCart />}
                            variant="light"
                            color="orange"
                            fullWidth
                            mt="md"
                            radius="md"
                        >
                            В корзину
                        </Button>
                    </div>
                )}
            </Card>}
    </div>
  );
};

export default DessertCard;
