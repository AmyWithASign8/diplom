import React from "react";
import {
  AspectRatio,
  Button,
  Center,
  Group,
  List,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowBigDownLinesFilled } from "@tabler/icons-react";

export const AboutUs = () => {
  return (
    <div>
      <Center mt={100} mb={50}>
        <Stack>
          <Stack>
            <Center>
              <Text fw={500} size={50}>
                О нас
              </Text>
            </Center>
            <Text size={30}>
              На этой странице вы сможете больше узнать про нашу компанию
            </Text>
          </Stack>
          <Group>
            <Text>
              Контактную информацию, время работы вы сможете узнать в подвале
              сайта
            </Text>
            <Button
              component={"a"}
              href={"#footer"}
              variant={"subtle"}
              color={"orange"}
              leftIcon={<IconArrowBigDownLinesFilled />}
            >
              Подвал сайта
            </Button>
          </Group>
          <Stack>
            <Text fw={500} size={40}>
              Мы
            </Text>
            <Text maw={900} fw={500}>
              Обычно люди приходят в места, рестораны, кафе, чтобы просто поесть
              пиццу. Наша компания предлагает, поесть пиццу не выходя из дома.
              Зачем выходить из дома, стоять в очереди, есть в общественном
              месте или есть дома, но уже остывшую пиццу, если вы не хотите или
              же нет настроения? Да можно разгогреть пиццу дома, но поверьте
              нам, вкус будет уже не тот, что при приготовлении.<br/><br/> Наши повара
              быстро приготовят качественную пиццу из свежих продуктов, а наши
              курьеры доставят ее в один миг! Для большинства компаний пиццерия
              - это просто бизнес, где они могут где-то "схитрить", устновив
              цену намного больше себестоимости или использовать не свежие
              продукты, экономив на них. Но для нас Tasty pizza — не только
              пицца. Это и пицца тоже, но в первую очередь это большое дело,
              которое вдохновляет нас, заставляет каждое утро просыпаться и с
              интересом продолжать работу. В чём же наш интерес? Сейчас
              расскажем.
            </Text>
          </Stack>
          <Stack>
            <Text fw={500} size={40}>
              Идеальные ингредиенты
            </Text>
            <Text maw={900} fw={500} >
              Почему мы так хотим познакомиться? Потому что дальше пицца делает
              всё сама. Люди видят, что она вкусная, и заказывают снова. Нам
              главное первый раз это показать. Вообще пицца — очень простая
              штука, её сложно испортить. Достаточно хороших ингредиентов и
              правильного теста. Это конструктор, если детали качественные, то и
              результат будет в порядке. Вот они, наши детали:
            </Text>
            <Stack>
              <Group>
                <Stack>
                  <Text color={"orange"} fw={500} size={40}>
                    Тесто
                  </Text>
                  <Text maw={450} fw={500}>
                    Самая тонкая вещь. Главное - сделать его «живым». Это целый
                    квест из граммов, градусов, процентов и часов с минутами.
                    Процесс непростой, но у нас получается!
                  </Text>
                </Stack>
                <Stack>
                  <Text color={"orange"} fw={500} size={40}>
                    Моцарелла
                  </Text>
                  <Text maw={450} fw={500}>
                    Сыр в пицце - ключевой ингредиент. Мы используем настоящую
                    моцареллу от российских поставщиков. Сыр должен тянуться,
                    как на картинке.
                  </Text>
                </Stack>
              </Group>
              <Group>
                <Stack>
                  <Text color={"orange"} fw={500} size={40}>
                    Начинка
                  </Text>
                  <Text maw={450} fw={500}>
                    Есть два главных правила вкусной начинки: не экономить на
                    начинке; фанатично соблюдать режим хранения. Это и весь
                    секрет.
                  </Text>
                </Stack>
                <Stack>
                  <Text color={"orange"} fw={500} size={40}>
                    Томатный соус
                  </Text>
                  <Text maw={450} fw={500}>
                    Главное, что нужно знать про хороший томатный соус: он
                    должен быть сделан из томатов. Звучит логично, но
                    задумайтесь!
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Stack>
          <Stack maw={900}>
            <Text fw={500} size={40}>
              Единые стандарты
            </Text>
            <Text maw={900} fw={500}>
              Цифровые технологии помогают нам вовремя замечать, если что-то
              идёт неправильно. Но как понять, что правильно, а что нет? Для
              этого у нас есть стандарты. Вот, например, про мытьё рук:
            </Text>
            <Group>
              <List withPadding>
                <List.Item>Выходил из кухни</List.Item>
                <List.Item>Сделал уборку</List.Item>
                <List.Item>Поправил прическу</List.Item>
                <List.Item>Коснулся одежды</List.Item>
                <List.Item>Почесал нос</List.Item>
                <List.Item>Считал деньги</List.Item>
              </List>
              <List withPadding>
                <List.Item>Выбросил мусор</List.Item>
                <List.Item>Коснулся не пищевой поверхности</List.Item>
                <List.Item>Поздоровался за руку</List.Item>
                <List.Item>Помыл продукты</List.Item>
                <List.Item>Отправил СМС</List.Item>
                <Text fw={500} color={"orange"} size={40}>
                  - надо помыть руки!
                </Text>
              </List>
            </Group>
            <Text fw={500}>
              Наши стандарты — это не какие-то заумные схемы и формулы, а
              супер-понятные правила. У нас их сотни, буквально про всё. Именно
              так мы умудряемся делать всё хорошо и одновременно быстро расти.
            </Text>
          </Stack>
          <Text size={40} fw={500}>
            Мы на карте:
          </Text>
          <AspectRatio ratio={20 / 15}>
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A7fdc79425de70a80ab733128b430358c44547cf688377a874a868b06950128a5&amp;source=constructor"
                width="500" height="400" frameBorder="0"></iframe>
          </AspectRatio>
        </Stack>
      </Center>
    </div>
  );
};
