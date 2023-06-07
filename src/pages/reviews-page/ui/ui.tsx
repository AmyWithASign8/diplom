import React from "react";
import {
  Alert,
  Button,
  Center,
  Group, Loader,
  Modal,
  NumberInput,
  Rating,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { CommentCard } from "../../../entities/comment-card";
import {IconAlertCircle, IconCheck, IconPencil} from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "effector-react/compat";
import { $isAuth } from "../../../app/models/isAuthStore";
import {useGetAllReviews} from "../../../shared/api/queries";
import {createReview} from "../../../shared/api/queries";
import {$user} from "../../../app/models/userStore";
import {useMutation, useQueryClient} from "react-query";
import {showNotification} from "@mantine/notifications";

interface IFormInput {
  title: string;
  description: string;
  rating: number;
}
export const ReviewsLayout = () => {
  const queryClient = useQueryClient()
  const user = useStore($user)
  const {data, isSuccess, isLoading, error} = useGetAllReviews()
  const isAuth = useStore($isAuth);
  const [opened, { open, close }] = useDisclosure(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const mutationCreateReview = useMutation((data: IFormInput) => createReview(data.title, data.description, data.rating, user?.id), {
    onSuccess: () => queryClient.invalidateQueries(['getAllReviews'])
  })
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      showNotification({
        id: "load-data",
        title: "Создание отзыва",
        message: `Ваш отзыв отправлен на рассмотрение администрации!`,
        autoClose: true,
        radius: "xl",
        fw: 500,
        icon: <IconCheck size="1rem" />,
      });
      mutationCreateReview.mutate(data)
      close()
    }catch (e) {
      showNotification({
        id: "load-data",
        title: "Ошибка",
        message: `Произошла ошщибка! Похоже вы не авторизованы или у нас проблемы с соединением!`,
        autoClose: true,
        radius: "xl",
        icon: <IconAlertCircle/>
      });
    }
  };
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
  if (isLoading) return <Center mt={'10%'} mb={'20%'}><Loader color="orange" size="xl" /></Center>
  if (!isSuccess) return <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
    Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
  </Alert>
  if (error) return <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
    Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
  </Alert>
  return (
    <div>
      {isAuth ? (
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
      ) : (
        <Modal opened={opened} onClose={close} title="Создание отзыва" centered>
          <Center>
            <Stack>
              <Text size={20} fw={500}>
                Чтобы написать отзыв вам нужно авторизоваться!
              </Text>
              <Button color={"orange"} onClick={close}>
                Ок
              </Button>
            </Stack>
          </Center>
        </Modal>
      )}
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
        {data.length === 0 ? <Text size={30} mb={'18%'}>Еще нет ни одного отзыва</Text> : <Stack>
          {data.map((obj) => (
              <CommentCard key={obj.id} landing={false} maxWidth={700} reviewData={obj}/>
          ))}
        </Stack>}
      </Center>
    </div>
  );
};
