import { createEvent, createStore } from "effector/compat";

export interface IUser {
  id: number;
  exp: number;
  iat: number;
  email: string;
  password: string;
  role: string;
}
export const setUser = createEvent<IUser>();
export const logout = createEvent();

export const $user = createStore<IUser | null>(null);
$user.on<IUser>(setUser, (state, data) => data);
$user.on(logout, () => null);
