import React from "react";
import {
  BackgroundImage,
  Text,
  Box,
  Button,
  Group,
  Stack, Alert, Loader, Center,
} from "@mantine/core";
import BgImagePizza from "../assets/images/bg-pizza.jpg";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import PizzaCard from "../../../../entities/pizza-card/ui/ui";
import { CommentCard } from "../../../../entities/comment-card";
import {useGetAllProducts} from "../../../../shared/api/queries";
import {useGetAllReviews} from "../../../../shared/api/queries";
import { IconAlertCircle } from "@tabler/icons-react";
import {useScreenSize} from "../../../../shared/hooks";
import {Breakpoints} from "../../../../shared/types";

export const LandingLayout = () => {
  const currentScreenSize = useScreenSize()
  const commentData = useGetAllReviews()
  const {data, isSuccess, isLoading, error} = useGetAllProducts('', 'none', 'none', 'none')
  if (isLoading) return <Center mt={'10%'} mb={'20%'}><Loader color="orange" size="xl" /></Center>
  if (!isSuccess) return <Center><Alert mt={'10%'} mb={'20%'} icon={<IconAlertCircle size="1rem" />} title="Ошибка!" color="red">
    Приносим свои извинения. При подключении к серверу произошла ошибка! Мы пытаемся это исправить!
  </Alert></Center>
  if (!commentData.isSuccess) return <Center><Alert mt={'10%'} mb={'20%'} icon={<IconAlertCircle size="1rem" />} title="Ошибка!" color="red">
    Приносим свои извинения. При подключении к серверу произошла ошибка! Мы пытаемся это исправить!
  </Alert></Center>
  if (error) return <Center><Alert mt={'10%'} mb={'20%'}  icon={<IconAlertCircle size="1rem" />} title="Ошибка!" color="red">
    Приносим свои извинения. При подключении к серверу произошла ошибка! Мы пытаемся это исправить!
  </Alert></Center>
  return (
    <div>
      <BackgroundImage src={BgImagePizza}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Box
          bg={"rgba(0, 0, 0, 0);"}
          maw={1600}
          ml={currentScreenSize < Breakpoints.md ? "0%" : "10%"}
          sx={() => ({
            padding: 50,
            borderRadius: 20,
          })}
        >
          <Text
            variant={"gradient"}
            gradient={{ from: "orange", to: "yellow", deg: 45 }}
            fw={700}
            size={currentScreenSize < Breakpoints.xl ? 50 : 70}
          >
            Добро пожаловать
          </Text>

          <Text
            variant={"gradient"}
            gradient={{ from: "orange", to: "yellow", deg: 75 }}
            fw={700}
            size={currentScreenSize < Breakpoints.xl ? 50 : 70}
            ml={currentScreenSize < Breakpoints.lg ? "15%" : "33%"}
          >
            на наш сайт
          </Text>
          <Text
            variant={"gradient"}
            gradient={{ from: "orange", to: "yellow", deg: 45 }}
            fw={700}
            size={currentScreenSize < Breakpoints.xl ? 50 : 70}
            ml={currentScreenSize < Breakpoints.lg ? "15%" : "55%"}
          >
            TASTY PIZZA
          </Text>
        </Box>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </BackgroundImage>
      {currentScreenSize >= Breakpoints.lg && <>
        <Group mt={"5%"} grow>
          <Stack ml={"10%"} mb={"5%"}>
            <Text
                variant={"gradient"}
                gradient={{ from: "yellow", to: "orange", deg: 45 }}
                fw={700}
                size={currentScreenSize < Breakpoints.xl ? 50 : 70}
            >
              Наши
            </Text>
            <Text
                variant={"gradient"}
                gradient={{ from: "orange", to: "yellow", deg: 45 }}
                ml={"7%"}
                fw={700}
                size={currentScreenSize < Breakpoints.xl ? 50 : 70}
            >
              новинки :
            </Text>
          </Stack>
          <Carousel
              mr={"7%"}
              withIndicators
              height={"100%"}
              slideSize={currentScreenSize < Breakpoints.xxl ? "40%" : "27.333333%"}
              slideGap="md"
              loop
              align="start"
              slidesToScroll={1}
          >
            {data.map((obj) => (
                <Carousel.Slide>
                  <PizzaCard productData={obj} landing={true} commerce={false} toCard={false} />
                </Carousel.Slide>
            ))}
          </Carousel>
        </Group>
        {commentData.data.length !== 0 && <Group mt={"5%"} grow>
          <Stack ml={"10%"} mb={"5%"}>
            <Text
                variant={"gradient"}
                gradient={{ from: "yellow", to: "orange", deg: 45 }}
                fw={700}
                size={70}
            >
              Последние
            </Text>
            <Text
                variant={"gradient"}
                gradient={{ from: "orange", to: "yellow", deg: 45 }}
                ml={"16%"}
                fw={700}
                size={70}
            >
              отзывы :
            </Text>
          </Stack>
          {commentData.data.length <= 3 ? <Group>{commentData.data.map((obj) => (<CommentCard key={obj.id} reviewData={obj} landing={true} maxWidth={400}/>))}</Group> : <Carousel
              mr={"7%"}
              withIndicators
              height={"100%"}
              slideSize={commentData.data.length === 1 ? '100%' : commentData.data.length === 2 ? '50%' : "27.333333%"}
              slideGap="md"
              loop
              align="start"
              slidesToScroll={1}
          >
            {commentData.data.map((obj) => (
                <Carousel.Slide>
                  <Link to={"/reviews"}>
                    <CommentCard key={obj.id} reviewData={obj} landing={true} maxWidth={400}/>
                  </Link>
                </Carousel.Slide>
            ))}
          </Carousel>}
        </Group>}</>}
      <Group mt={150} position={"center"} mb={200}>
        <Box
          maw={700}
          sx={() => ({
            backgroundColor: "rgba(255, 111, 0, 0.5)",
            textAlign: "center",
            borderRadius: 20,
            padding: 50,
          })}
        >
          <Text color={"#fff"} fw={500} size={30}>
            Посмотрите каталог наших товаров
          </Text>
          <Text color={"#fff"}>
            Вы можете просмотреть наш каталог товаров без регистрации, у нас
            имеется более 100 видов пицц! А так же можете прочитать отзывы к
            нашему сайту
          </Text>
          <Group position={"center"} mt={40}>
            <Button component={Link} to={"/catalog"} color={"orange"}>
              Каталог товаров
            </Button>
            <Button color={"orange"} component={Link} to={"/reviews"}>
              Отзывы
            </Button>
          </Group>
        </Box>

        <Box
          maw={700}
          sx={() => ({
            backgroundColor: "rgba(255, 111, 0, 0.5)",
            textAlign: "center",
            borderRadius: 20,
            padding: 50,
          })}
        >
          <Text color={"#fff"} fw={500} size={30}>
            Зарегистрируйтесь или войдите аккаунт
          </Text>
          <Text color={"#fff"}>
            Зарегестрировавшись или войдя в свой аккаунт вы сможете совершать
            покупки, а так же просматривать историю заказов
          </Text>
          <Group position={"center"} mt={40}>
            <Button color={"orange"} component={Link} to={"/user/reg"}>
              Регистрация
            </Button>
            <Button color={"orange"} component={Link} to={"/user/auth"}>
              Войти в аккаунт
            </Button>
          </Group>
        </Box>
      </Group>
    </div>
  );
};
