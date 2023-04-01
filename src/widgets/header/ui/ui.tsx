import React from "react";
import {
  Button,
  Group,
  Image,
  Text,
  Header as ManTineHeader,
} from "@mantine/core";
import HeaderImg from "../assets/images/favicon.png";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <ManTineHeader
      height={80}
      sx={() => ({
        position: "fixed",
        width: "100%",
        opacity: 0.8,
        transition: "0.7s all",

        "&:hover": {
          opacity: 1,
          transition: "0.7s all",
        },
      })}
    >
      <Group position={"apart"}>
        <Link to={"/"}>
          <Group>
            <Image src={HeaderImg} width={70} />
            <Text fs={"Italic"} fw={500} size={30}>
              Tasty pizza
            </Text>
          </Group>
        </Link>
        <Button
          leftIcon={<IconShoppingCart />}
          variant="subtle"
          color="orange"
          component={Link}
          to={"/cart"}
        >
          Корзина
        </Button>
      </Group>
    </ManTineHeader>
  );
};
