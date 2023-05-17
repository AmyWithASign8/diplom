import React, { useRef } from "react";
import {
  Button,
  Center,
  Group,
  rem,
  Select,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {IconAlertCircle, IconCheck, IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {createProduct} from "../../../../shared/api/queries/product";
import {showNotification} from "@mantine/notifications";
import {useGetAllBrands} from "../../../../shared/api/queries/brand/useGetBrands";

interface Inputs {
  title: string;
  description: string;
  price: any;
  additional: any;
  type: string;
  brand: string;
}
export const AdminAddProductLayout = () => {
  const { data, isLoading, isSuccess } = useGetAllBrands();
  const [file, setFile] = React.useState<FileWithPath | any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const theme = useMantineTheme();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      file.forEach((file: any) => {
        formData.append("image", file);
      });
      formData.append('additional', data.additional)
      formData.append("type", currentProductType);
      formData.append("brand", currentProductBrand);

      const response = await createProduct(formData);
      console.log(response);
      showNotification({
        id: "load-data",
        title: "Создание продукта",
        message: `Продукт «${data.title}» успешно создан!`,
        autoClose: true,
        radius: "xl",
        icon: <IconCheck size="1rem" />,
      });
    } catch (e) {
      console.log(file)
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
  React.useEffect(() => {
    console.log(file);
  }, [file]);
  const [currentProductType, setCurrentProductType] = React.useState<
    any
  >(null);
  const [currentProductBrand, setCurrentProductBrand] = React.useState<
    any
  >(null);
  const ValidateFunc = (validateInput: any) => {
    if (validateInput?.ref.name === "title") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
      if (validateInput?.type === "maxLength")
        return "Название должно содержать менее 100 символов";
    } else if (validateInput?.ref.name === "description") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
      if (validateInput?.type === "maxLength")
        return "Описание должно содержать менее 300 символов";
    } else if (validateInput?.ref.name === "price") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
      if (validateInput?.type === "maxLength")
        return "Цена не может быть шестизначной или больше";
      if (validateInput?.type === "pattern")
        return "Тут могут использоваться только цифры!";
    } else if (validateInput?.ref.name === "additional") {
      if (validateInput?.type === "required")
        return "Это поле не может быть пустым";
    }
  };

  if (!isSuccess) return null
  console.log(data[currentProductType])
  return (
    <div>
      <Center>
        <Text size={20}>Добавление продукта</Text>
      </Center>
      <Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dropzone
            maxFiles={1}
            onDrop={(files) => setFile(files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size="3.2rem"
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size="3.2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Перетащите или нажмите сюда чтобы выбрать изображение
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Размер файла не должен превышать 5 мегабайт, вы можете
                  прикрекить только 1 изображение, если выберете еще одно, оно
                  заменит предыдущее
                </Text>
              </div>
            </Group>
          </Dropzone>
          <TextInput
            error={ValidateFunc(errors.title)}
            label={
              file === null
                ? "Сначала прикрепите картинку!"
                : "Укажите название продукта"
            }
            mt={10}
            placeholder={"Введите название продукта"}
            {...register("title", { required: true, maxLength: 100 })}
            disabled={file === null && true}
          />
          <TextInput
            error={ValidateFunc(errors.description)}
            label={
              file === null
                ? "Сначала прикрепите картинку!"
                : "Укажите описание продукта"
            }
            mt={10}
            placeholder={"Введите описание продукта"}
            {...register("description", { required: true, maxLength: 300 })}
            disabled={file === null && true}
          />
          <TextInput
            error={ValidateFunc(errors.price)}
            {...register("price", {
              required: true,
              pattern: /^[ 0-9]+$/,
              maxLength: 5,
            })}
            mt={10}
            label={
              file === null ? "Сначала прикрепите картинку!" : "Укажите цену"
            }
            min={0}
            placeholder={"99999 ₽"}
            disabled={file === null && true}
          />
          <Select
            disabled={file === null && true}
            label={
              file === null
                ? "Сначала прикрепите картинку!"
                : "Укажите тип продукта"
            }
            mt={10}
            onChange={(value) => setCurrentProductType(value)}
            clearable
            placeholder="Выберите тип продукта"
            data={data.map((obj) => ({value: `${obj.id}`, label: `${obj.name}`}))}
            styles={(theme) => ({
              item: {
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.orange[9]
                        : theme.colors.orange[1],
                    color:
                      theme.colorScheme === "dark"
                        ? theme.white
                        : theme.colors.orange[9],
                  },
                },
              },
            })}
          />
          <TextInput
            error={ValidateFunc(errors.additional)}
            {...register("additional", {
              required: true,
            })}
            mt={10}
            disabled={currentProductType === null && true}
            label={'Укажите доп. информацию'}
          />
          <Select
            onChange={(value) => setCurrentProductBrand(value)}
            label={
              currentProductType === "1"
                ? "Укажите вид пиццы"
                : currentProductType === "2"
                ? "Укажите вид напитка"
                : currentProductType === "3"
                ? "Укажите вид десерта"
                : "Выберите сначала тип продукта!"
            }
            mt={10}
            clearable
            disabled={currentProductType === null && true}
            placeholder={
              currentProductType === null
                ? "Выберите тип продукта"
                : "Выберите вид продукта"
            }
            data={currentProductType !== null && data.map((obj) => (
                obj.id === currentProductType && obj.types.map((obj) => ({value: `${obj.id}`, label: `${obj.name}`}))
            ))}
            styles={(theme) => ({
              item: {
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.orange[9]
                        : theme.colors.orange[1],
                    color:
                      theme.colorScheme === "dark"
                        ? theme.white
                        : theme.colors.orange[9],
                  },
                },
              },
            })}
          />
          {setCurrentProductBrand === null && (
            <Center mt={10}>
              <Text c={"red"}>Все поля должны быть заполнены</Text>
            </Center>
          )}
          <Center>
            <Button
              disabled={setCurrentProductBrand === null && true}
              mt={10}
              type={"submit"}
            >
              Добавить продукт
            </Button>
          </Center>
        </form>
      </Center>
    </div>
  );
};
