import React from "react";
import {
  BackgroundImage,
  Text,
  Box,
  Center,
  Image,
  Button,
  Group,
} from "@mantine/core";
import BgImagePizza from "../assets/images/bg-pizza.jpg";
import { Carousel } from "@mantine/carousel";

export const LandingLayout = () => {
  return (
    <div>
      <BackgroundImage src={BgImagePizza}>
        <Center>
          <Box
            bg={"rgba(0, 0, 0, 0.7);"}
            maw={800}
            mt={200}
            sx={() => ({
              textAlign: "center",
              padding: 50,
              borderRadius: 20,
            })}
          >
            <Center>
              <Text color={"#fff"} fw={700} size={60}>
                Добро пожаловать
              </Text>
            </Center>
            <Text color={"#fff"}>
              Вы попали на сайт онлайн-пиццерия "Tasty pizza". Закажите быстро и
              просто вкуснейшюю пиццуВы попали на сайт онлайн-пиццерия "Tasty
              pizza". Закажите быстро и просто вкуснейшюю пиццуВы попали на сайт
              онлайн-пиццерия "Tasty pizza". Закажите быстро и просто вкуснейшюю
              пиццуВы попали на сайт онлайн-пиццерия "Tasty pizza". Закажите
              быстро и просто вкуснейшюю пиццуВы попали на сайт онлайн-пиццерия
              "Tasty pizza". Закажите быстро и просто вкуснейшюю пиццуВы попали
              на сайт онлайн-пиццерия "Tasty pizza". Закажите быстро и просто
              вкуснейшюю пиццуВы попали на сайт онлайн-пиццерия "Tasty pizza".
              Закажите быстро и просто вкуснейшюю пиццуВы попали на сайт
              онлайн-пиццерия "Tasty pizza". Закажите быстро и просто вкуснейшюю
              пиццуВы попали на сайт онлайн-пиццерия "Tasty pizza". Закажите
              быстро и просто вкуснейшюю пиццуВы попали на сайт онлайн-пиццерия
              "Tasty pizza". Закажите быстро и просто вкуснейшюю пиццу
            </Text>
          </Box>
        </Center>
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
      <Center>
        <Text fw={500} size={30}>
          Стоит попробывать :{" "}
        </Text>
      </Center>
      <Carousel slideSize="70%" height={400} slideGap="md" loop withIndicators>
        <Carousel.Slide>
          <BackgroundImage src={BgImagePizza}>
            <Box
              bg={"rgba(0, 0, 0, 0.5);"}
              maw={800}
              sx={() => ({
                textAlign: "center",
                padding: 50,
                borderRadius: 20,
              })}
            >
              <Button>Каталог</Button>
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
            </Box>
          </BackgroundImage>
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={BgImagePizza} />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={BgImagePizza} />
        </Carousel.Slide>
      </Carousel>
      <Center>
        <Box
          maw={700}
          mt={50}
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
            имеется более 100 видов пицц! А так же можете прочитать комментарии
            к нашему сайту
          </Text>
          <Group position={"center"} mt={40}>
            <Button color={"orange"}>Каталог товаров</Button>
            <Button color={"orange"}>Комментарии</Button>
          </Group>
        </Box>
      </Center>
      <Center>
        <Box
          maw={700}
          mt={50}
          mb={100}
          sx={() => ({
            backgroundColor: "rgba(255, 111, 0, 0.5)",
            textAlign: "center",
            borderRadius: 20,
            padding: 50,
          })}
        >
          <Text color={"#fff"} fw={500} size={30}>
            Быстрее зарегистрируйтесь или войдите в свой аккаунт
          </Text>
          <Text color={"#fff"}>
            Зарегестрировавшись или войдя в свой аккаунт вы сможете совершать
            покупки, а так же просматривать историю заказов
          </Text>
          <Group position={"center"} mt={40}>
            <Button color={"orange"}>Регистрация</Button>
            <Button color={"orange"}>Войти в аккаунт</Button>
          </Group>
        </Box>
      </Center>
    </div>
  );
};
