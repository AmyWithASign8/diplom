import React from "react";
import {
  Button,
  Center,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import PizzaCard from "../../../entities/pizza-card/ui/ui";
import DessertCard from "../../../entities/dessert-card/ui/ui";
import DrinkCard from "../../../entities/drink-card/ui/ui";
import { IconCreditCard } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const CartLayout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Очистить корзину" centered>
        <Text>Вы уверены что хотите очистить корзину?</Text>
        <Group position={"center"} mt={"5%"}>
          <Button color={"green"} variant={"light"}>
            Да
          </Button>
          <Button color={"red"} variant={"light"} onClick={close}>
            Отмена
          </Button>
        </Group>
      </Modal>
      <Center mt={"5%"}>
        <Group position={"apart"} w={600}>
          <Text size={40}>Моя корзина</Text>
          <Button color={"red"} onClick={open}>
            Очистить корзину
          </Button>
        </Group>
      </Center>
      <Center mt={"3%"}>
        <SimpleGrid cols={1}>
          <PizzaCard landing={false} commerce={false} toCard={true} />
          <PizzaCard landing={false} commerce={false} toCard={true} />
          <DessertCard landing={false} commerce={false} toCard={true} />
          <DessertCard landing={false} commerce={false} toCard={true} />
          <DrinkCard landing={false} commerce={false} toCard={true} />
          <DrinkCard landing={false} commerce={false} toCard={true} />
        </SimpleGrid>
      </Center>
      <Group mt={"4%"} ml={"25%"} position={"apart"} w={"50%"}>
        <Group>
          <Text size={25}>Итоговая сумма:</Text>
          <Text size={26}>1000 RUB</Text>
        </Group>
        <Button leftIcon={<IconCreditCard />} color={"green"}>
          Оплатить
        </Button>
      </Group>
    </div>
  );
};
