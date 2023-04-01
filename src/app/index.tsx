import React from "react";
import { withProviders } from "./providers";
import Pages from "../pages";
import "./index.pcss";
import { MantineProvider } from "@mantine/core";
import { useStore } from "effector-react/compat";
import { $theme } from "./models/themeStore";

const App = () => {
  const theme = useStore($theme);
  return (
    <div>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: theme }}
      >
        <Pages />
      </MantineProvider>
    </div>
  );
};
export default withProviders(App);
