import React from 'react';
import HeaderImg from './assets/images/favicon.png'
import {Center, Group, Image, Loader, Stack, Text} from "@mantine/core";

const SuspenseLoader = () => {
    return (
        <div>
            <Center mt={'15%'}>
                <Stack>
                    <Group>
                        <Image src={HeaderImg} width={70} />
                        <Text
                            variant="gradient"
                            gradient={{ from: "yellow", to: "orange", deg: 45 }}
                            fs={"Italic"}
                            fw={500}
                            size={30}
                        >
                            Tasty pizza
                        </Text>
                    </Group>
                    <Center>
                        <Loader color="orange" size="xl" variant="bars" />
                    </Center>
                </Stack>
            </Center>
        </div>
    );
};

export default SuspenseLoader;