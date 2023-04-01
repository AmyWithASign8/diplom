import React from "react";
import { Box, Button, Center, Text } from "@mantine/core";
import { IconArrowBigDownLinesFilled } from "@tabler/icons-react";

export const AboutUs = () => {
  return (
    <div>
      <Center>
        <Box
          maw={1000}
          mt={100}
          sx={() => ({
            backgroundColor: "rgba(255, 111, 0, 0.5)",
            textAlign: "center",
            borderRadius: 20,
            padding: 50,
          })}
        >
          <Text fw={500} size={30}>
            О нас
          </Text>
          <Text>
            Контактную информацию, время работы вы сможете узнать в подвале
            сайта
          </Text>
          <Button
            variant={"subtle"}
            color={"orange"}
            leftIcon={<IconArrowBigDownLinesFilled />}
            mt={20}
          >
            Подвал сайта
          </Button>
        </Box>
      </Center>
    </div>
  );
};
