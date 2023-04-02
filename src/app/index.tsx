import React from "react";
import { withProviders } from "./providers";
import Pages from "../pages";
import "./index.pcss";
import { MantineProvider } from "@mantine/core";
import { useStore } from "effector-react/compat";
import { $theme } from "./models/themeStore";
import { Notifications } from "@mantine/notifications";

const App = () => {
  const theme = useStore($theme);
  return (
    <div>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: theme }}
      >
        <Notifications />
        <Pages />
      </MantineProvider>
    </div>
  );
};
export default withProviders(App);
