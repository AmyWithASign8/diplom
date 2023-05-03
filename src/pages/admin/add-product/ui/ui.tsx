import React, { useRef } from "react";
import {
  Button,
  Center,
  Group, NumberInput,
  rem, Select,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import {Dropzone, FileWithPath, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import {SubmitHandler, useForm} from "react-hook-form";

interface Inputs {
  title: string,
  description: string,
  price: number,
  weight: number,
  type: string,
  variety: string
}
export const AdminAddProductLayout = () => {
  const [file, setFile] = React.useState<FileWithPath[] | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data, currentProductVariety, currentProductType)
  React.useEffect(() => {
    console.log(file)
  }, [file])
  const [currentProductType, setCurrentProductType] = React.useState<string | null>(null);
  const [currentProductVariety, setCurrentProductVariety] = React.useState<string | null>(null);
  const ValidateFunc = (validateInput: any) => {
    if (validateInput?.ref.name === 'title'){
      if (validateInput?.type === 'required') return 'Это поле не может быть пустым'
      if (validateInput?.type === 'maxLength') return 'Название должно содержать менее 100 символов'
    }else if (validateInput?.ref.name === 'description') {
      if (validateInput?.type === 'required') return 'Это поле не может быть пустым'
      if (validateInput?.type === 'maxLength') return 'Описание должно содержать менее 300 символов'
    }else if (validateInput?.ref.name === 'price') {
      if (validateInput?.type === 'required') return 'Это поле не может быть пустым'
      if (validateInput?.type === 'maxLength') return 'Цена не может быть шестизначной или больше'
      if (validateInput?.type === 'pattern') return 'Тут могут использоваться только цифры!'
    }else if (validateInput?.ref.name === 'weight') {
      if (validateInput?.type === 'required') return 'Это поле не может быть пустым'
      if (validateInput?.type === 'maxLength') return 'Цена не может быть шестизначной или больше'
      if (validateInput?.type === 'pattern') return 'Тут могут использоваться только цифры!'
    }
  }
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
          <TextInput error={ValidateFunc(errors.title)} label={file === null ? 'Сначала прикрепите картинку!' : 'Укажите название продукта'} mt={10} placeholder={'Введите название продукта'} {...register('title', {required: true, maxLength: 100})} disabled={file === null && true}/>
          <TextInput error={ValidateFunc(errors.description)} label={file === null ? 'Сначала прикрепите картинку!' : 'Укажите описание продукта'} mt={10} placeholder={'Введите описание продукта'} {...register('description', {required: true, maxLength: 300})} disabled={file === null && true}/>
          <TextInput
              error={ValidateFunc(errors.price)}
              {...register('price', {required:true, pattern: /^[ 0-9]+$/, maxLength: 5})}
              mt={10}
              label={file === null ? 'Сначала прикрепите картинку!' : "Укажите цену"}
              min={0}
              placeholder={'99999 ₽'}
              disabled={file === null && true}
          />
          <Select disabled={file === null && true} label={file === null ? 'Сначала прикрепите картинку!' : 'Укажите тип продукта'} mt={10}
                  onChange={(value) => setCurrentProductType(value)}
              clearable
              placeholder="Выберите тип продукта"
              data={[
                { value: "pizza", label: "Пицца" },
                { value: "dessert", label: "Десерт" },
                { value: "drink", label: "Напиток" },
              ]}
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
              error={ValidateFunc(errors.weight)}
              {...register('weight', {required:true, pattern: /^[ 0-9]+$/, maxLength: 5})}
              mt={10}
              placeholder={'99999 ₽'}
              disabled={currentProductType === null && true}
              label={currentProductType === 'pizza' ? "Укажите вес пиццы в граммах" : currentProductType === 'dessert' ? "Укажите количество в шт." : currentProductType === 'drink' ? "Укажите обьем в мл." : 'Укажите тип продукта!'}
              min={0}
          />
          <Select onChange={(value) => setCurrentProductVariety(value)} label={currentProductType === 'pizza' ? 'Укажите вид пиццы' : currentProductType === 'drink' ? 'Укажите вид напитка' : currentProductType === 'dessert' ? 'Укажите вид десерта' : 'Выберите сначала тип продукта!'} mt={10}
                  clearable
                  disabled={currentProductType === null && true}
                  placeholder={currentProductType === null ? "Выберите тип продукта" : 'Выберите вид продукта'}
                  data={currentProductType === 'pizza' ? [
                    { value: "pizza", label: "Мясная" },
                    { value: "dessert", label: "Вега" },
                    { value: "drink", label: "Сырная" },
                  ] : currentProductType === 'drink' ? [
                    { value: "pizza", label: "Горячие" },
                    { value: "dessert", label: "Холодные" },
                    { value: "drink", label: "Коктейли" },
                  ] : [
                    { value: "pizza", label: "Печенье" },
                    { value: "dessert", label: "Пирожоное" },
                    { value: "drink", label: "Кексы" },
                  ]}
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
          {currentProductVariety === null && <Center mt={10}><Text c={'red'}>Все поля должны быть заполнены</Text></Center>}
          <Center>
            <Button disabled={currentProductVariety === null && true} mt={10} type={"submit"}>Добавить продукт</Button>

          </Center>
        </form>
      </Center>
    </div>
  );
};
