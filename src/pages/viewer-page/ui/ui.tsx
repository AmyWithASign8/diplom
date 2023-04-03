import React from "react";
import {Center, Divider, Group, Stack, Tabs, Text} from "@mantine/core";
import {IconHistory, IconInfoCircle} from "@tabler/icons-react";

export const ViewerLayout = () => {
  return <div>
    <Text ml={'8%'} mt={'5%'} fw={500} size={40} mr={100}>
      Мой профиль:
    </Text>
    <Center mt={'2%'} mb={120}>
        <Stack>

          <Tabs
              color="orange"
              defaultValue="gallery"
          >
            <Tabs.List ml={10}>
              <Tabs.Tab value="info" icon={<IconInfoCircle size="0.8rem" />}>
                Общая информация
              </Tabs.Tab>
              <Tabs.Tab value="history" icon={<IconHistory size="0.8rem" />}>
                История заказов
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="info" pt="xs">
              <Stack mt={30}>
                <Group>
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>Электронная почта:</Text>
                  <Text  size={20}>danil@gmail.com</Text>
                </Group>
                <Group>
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>Пароль:</Text>
                  <Text  size={20}>danil@gmail.com</Text>
                </Group>
                <Group>
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>Количество заказов:</Text>
                  <Text  size={20}>80</Text>
                </Group>
                <Group>
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>Всего потрачено:</Text>
                  <Text  size={20}>8000 RUB</Text>
                </Group>
                <Group>
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>На сайте с</Text>
                  <Text  size={20}>26.04.2023 года</Text>
                </Group>
                <Group>
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>Любимое блюдо:</Text>
                  <Text  size={20}>Сырная пицца(53 заказа)</Text>
                </Group>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="history" pt="xs">
              <Stack>
                <Group>
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>Заказ №</Text>
                  <Text size={20}>777</Text>
                  <Divider size="sm" orientation="vertical" />
                  <Text variant="gradient"
                        gradient={{ from: "yellow", to: "orange", deg: 45 }} size={20}>Дата:</Text>
                  <Text size={20}>24.03.2023 года</Text>
                </Group>

                  <Group>
                    <Text size={20}>Сырная пицца</Text>
                    <Divider size="sm" orientation="vertical" />
                    <Text size={20}>Кол-во: 80</Text>
                  </Group>
                  <Group>
                    <Text size={20}>Сырная пицца</Text>
                    <Divider size="sm" orientation="vertical" />
                    <Text size={20}>Кол-во: 80</Text>
                  </Group>
                  <Text size={20}>Итоговая сумма заказа: 77777 RUB</Text>
              </Stack>
              <Divider mt={30} size={'xl'} mb={90}/>
            </Tabs.Panel>

          </Tabs>
        </Stack>
    </Center>
  </div>;
};
