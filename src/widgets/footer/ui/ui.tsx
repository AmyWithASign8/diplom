import React from "react";
import {
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {useScreenSize} from "../../../shared/hooks";
import {Breakpoints} from "../../../shared/types";

export const Footer = () => {
  const currentScreenSize = useScreenSize()
  return (
    <div>
      <Divider
        my="xs"
        label="Подвал сайта"
        labelPosition="center"
        variant={"dashed"}
      />
      {currentScreenSize <= Breakpoints.md ? <Stack>
        <Stack align="center" >
          <Text fw={700} size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'}>Контактная информация</Text>
          <Button component={'a'} href="mailto:danilstorage@gmail.com"  variant="subtle" color="orange" size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'}>
            Эл. почта: danilstorage@gmail.com
          </Button>
          <Button
              size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'}
              component={"a"}
              href={"tel:+79999999999"}
              variant="subtle"
              color="orange"
          >
            Телефон: +7 (999) 999 99-99
          </Button>
        </Stack>
        <Stack align="center" >
          <Text size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} fw={700}>Общая информация</Text>
          <Link to={"/about-us"}>
            <Button size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} variant="subtle" color="orange">
              О нас
            </Button>
          </Link>
        </Stack>
        <Stack align="center" >
          <Text size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} fw={700}>Время работы</Text>
          <Button size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} variant="subtle" color="orange">
            Пн - чт : 9:00, 22:00 мск.
          </Button>
          <Button size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} id={"footer"} variant="subtle" color="orange">
            Пт - Сб : 12:00, 21:00 мск.
          </Button>
        </Stack>
      </Stack> : <Group grow>
        <Stack align="center" >
          <Text fw={700} size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'}>Контактная информация</Text>
          <Button component={'a'} href="mailto:danilstorage@gmail.com"  variant="subtle" color="orange" size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'}>
            Эл. почта: danilstorage@gmail.com
          </Button>
          <Button
              size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'}
              component={"a"}
              href={"tel:+79999999999"}
              variant="subtle"
              color="orange"
          >
            Телефон: +7 (999) 999 99-99
          </Button>
        </Stack>
        <Stack align="center" >
          <Text size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} fw={700}>Общая информация</Text>
          <Link to={"/about-us"}>
            <Button size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} variant="subtle" color="orange">
              О нас
            </Button>
          </Link>
        </Stack>
        <Stack align="center" >
          <Text size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} fw={700}>Время работы</Text>
          <Button size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} variant="subtle" color="orange">
            Пн - чт : 9:00, 22:00 мск.
          </Button>
          <Button size={currentScreenSize <= Breakpoints.md ? 'sm' : 'md'} id={"footer"} variant="subtle" color="orange">
            Пт - Сб : 12:00, 21:00 мск.
          </Button>
        </Stack>
      </Group>}
      <Center>
        <Stack
          sx={() => ({
            textAlign: "center",
          })}
        >
          <Text tt={"uppercase"}>Tasty pizza © 2023</Text>
          <Text c="dimmed" size={15}>
            © 2023 Онлайн-пиццерия "Tasty pizza"
          </Text>
        </Stack>
      </Center>
    </div>
  );
};
