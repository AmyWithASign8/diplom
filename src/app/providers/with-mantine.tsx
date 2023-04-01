import React from "react"
import { MantineProvider } from '@mantine/core';

export const withManTine = (component: () => React.ReactNode) => {
    return () => (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
            {component()}
        </MantineProvider>
    )
}