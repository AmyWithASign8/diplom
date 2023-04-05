import React from "react";
import {
  BackgroundImage,
  Text,
  Box,
  Center,
  Image,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import BgImagePizza from "../assets/images/bg-pizza.jpg";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import PizzaCard from "../../../../entities/pizza-card/ui/ui";
import { CommentCard } from "../../../../entities/comment-card";

export const LandingLayout = () => {
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
          ml={"10%"}
          sx={() => ({
            padding: 50,
            borderRadius: 20,
          })}
        >
          <Text
            variant={"gradient"}
            gradient={{ from: "orange", to: "yellow", deg: 45 }}
            fw={700}
            size={70}
          >
            Добро пожаловать
          </Text>

          <Text
            variant={"gradient"}
            gradient={{ from: "orange", to: "yellow", deg: 75 }}
            fw={700}
            size={70}
            ml={"35%"}
          >
            на наш сайт
          </Text>
          <Text
            variant={"gradient"}
            gradient={{ from: "orange", to: "yellow", deg: 45 }}
            fw={700}
            size={70}
            ml={"60%"}
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
      <Group mt={"5%"} grow>
        <Stack ml={"10%"} mb={"5%"}>
          <Text
            variant={"gradient"}
            gradient={{ from: "yellow", to: "orange", deg: 45 }}
            fw={700}
            size={70}
          >
            Наши
          </Text>
          <Text
            variant={"gradient"}
            gradient={{ from: "orange", to: "yellow", deg: 45 }}
            ml={"7%"}
            fw={700}
            size={70}
          >
            новинки :
          </Text>
        </Stack>
        <Carousel
          mr={"7%"}
          withIndicators
          height={"100%"}
          slideSize="27.333333%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
        >
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
          <Carousel.Slide>
            <PizzaCard landing={true} commerce={false} toCard={false} />
          </Carousel.Slide>
        </Carousel>
      </Group>
      <Group mt={"5%"} grow>
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
        <Carousel
          mr={"7%"}
          withIndicators
          height={"100%"}
          slideSize="27.333333%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
        >
          <Carousel.Slide>
            <Link to={'/reviews'}>
              <CommentCard landing={true} maxWidth={400}/>
            </Link>
          </Carousel.Slide>
          <Carousel.Slide>
            <Link to={'/reviews'}>
              <CommentCard landing={true} maxWidth={400}/>
            </Link>
          </Carousel.Slide>
          <Carousel.Slide>
            <Link to={'/reviews'}>
              <CommentCard landing={true} maxWidth={400}/>
            </Link>
          </Carousel.Slide>
          <Carousel.Slide>
            <Link to={'/reviews'}>
              <CommentCard landing={true} maxWidth={400}/>
            </Link>
          </Carousel.Slide>
          <Carousel.Slide>
            <Link to={'/reviews'}>
              <CommentCard landing={true} maxWidth={400}/>
            </Link>
          </Carousel.Slide>
          <Carousel.Slide>
            <Link to={'/reviews'}>
              <CommentCard landing={true} maxWidth={400}/>
            </Link>
          </Carousel.Slide>
          <Carousel.Slide>
            <Link to={'/reviews'}>
              <CommentCard landing={true} maxWidth={400}/>
            </Link>
          </Carousel.Slide>
        </Carousel>
      </Group>
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
            имеется более 100 видов пицц! А так же можете прочитать отзывы
            к нашему сайту
          </Text>
          <Group position={"center"} mt={40}>
            <Button component={Link} to={"/catalog"} color={"orange"}>
              Каталог товаров
            </Button>
            <Button color={"orange"} component={Link} to={'/reviews'}>Отзывы</Button>
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
            <Button color={"orange"} component={Link} to={'/user/reg'}>Регистрация</Button>
            <Button color={"orange"} component={Link} to={'/user/auth'}>Войти в аккаунт</Button>
          </Group>
        </Box>
      </Group>
    </div>
  );
};
