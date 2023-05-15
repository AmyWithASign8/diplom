import { createEvent, createStore } from "effector/compat";

export const switchAuth = createEvent<boolean>();

const rememberAuth = Boolean(localStorage.getItem("isAuth"));
export const $isAuth = createStore<boolean>(
  Boolean(<true | false>rememberAuth || false)
).on(switchAuth, (state, isAuth) => isAuth);
