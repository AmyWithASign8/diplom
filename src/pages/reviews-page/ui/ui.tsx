import React from "react";
import {
  Button,
  Center,
  Group,
  Input,
  Modal,
  NumberInput,
  Rating,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { CommentCard } from "../../../entities/comment-card";
import { IconPencil } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";

interface IFormInput {
  title: string;
  description: string;
  rating: number;
}

export const ReviewsLayout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const ValidateFunc = (validateInput: any) => {
    if (validateInput?.ref.name === "title") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
      if (validateInput?.type === "maxLength")
        return "Заголовок должен содержать менее 100 символов";
    } else if (validateInput?.ref.name === "description") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
      if (validateInput?.type === "maxLength")
        return "Пароль должен содержать менее 2000 символов";
    } else if (validateInput?.ref.name === "rating") {
      if (validateInput?.type === "valueAsNumber")
        return "В это поле можно вводить только числа";
      if (validateInput?.type === "maxLength")
        return "Рейтинг не может быть больше 5";
      if (validateInput?.type === "minLength")
        return "Рейтинг не может быть меньше 0";
    }
  };
  const [rateValue, setRateValue] = React.useState<number | any>(0);
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Создание отзыва" centered>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            error={ValidateFunc(errors.title)}
            {...register("title", { required: true, maxLength: 100 })}
            label="Заголовок отзыва"
            placeholder="Введите заголовок отзыва"
            data-autofocus
            withAsterisk
          />
          <Textarea
            error={ValidateFunc(errors.description)}
            {...register("description", { required: true, maxLength: 2000 })}
            placeholder="Введите описание отзыва"
            label="Описание отзыва"
            withAsterisk
            minRows={6}
            maxRows={10}
          />
          <Text mt={10}>Поставте оценку (от 0 до 5):</Text>
          <Group>
            <NumberInput
              error={ValidateFunc(errors.rating)}
              {...register("rating", {
                valueAsNumber: true,
                maxLength: 5,
                minLength: 0,
              })}
              placeholder="Your age"
              defaultValue={0.0}
              precision={1}
              step={0.5}
              max={5}
              min={0}
              value={rateValue}
              onChange={(value) => setRateValue(value)}
            />
            <Rating
              fractions={2}
              defaultValue={0}
              size={"xl"}
              value={rateValue}
              readOnly
            />
          </Group>
          <Button
            type={"submit"}
            leftIcon={<IconPencil />}
            color={"orange"}
            fullWidth
            mt="md"
          >
            Создать
          </Button>
        </form>
      </Modal>
      <Group mt={100} ml={"25%"} position={"apart"} w={"47%"}>
        <Text size={30} fw={500}>
          Отзывы
        </Text>
        <Group>
          <Text>Напишите свой отзыв:</Text>
          <Button
            leftIcon={<IconPencil />}
            color={"orange"}
            variant={"light"}
            onClick={open}
          >
            Написать
          </Button>
        </Group>
      </Group>
      <Center mt={100}>
        <Stack>
          <CommentCard landing={false} maxWidth={900} />
          <CommentCard landing={false} maxWidth={900} />
          <CommentCard landing={false} maxWidth={900} />
          <CommentCard landing={false} maxWidth={900} />
        </Stack>
      </Center>
    </div>
  );
};
