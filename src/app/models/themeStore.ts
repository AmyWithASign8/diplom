import { createEvent, createStore } from "effector/compat";
import { ColorScheme } from "@mantine/core";

export const switchTheme = createEvent<ColorScheme>();
const rememberTheme = localStorage.getItem("theme");
console.log(rememberTheme, "remember");
export const $theme = createStore<ColorScheme>(
  <"light" | "dark">rememberTheme || "light"
).on(switchTheme, (state, theme) => theme);
