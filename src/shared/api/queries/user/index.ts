import { $authHost, $host } from "../../http";
import jwtDecode from "jwt-decode";
import {IUser, logout, setUser} from "../../../../app/models/userStore";
import { switchAuth } from "../../../../app/models/isAuthStore";

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post("api/user/create", {
    email,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (email: string, password: string) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  try {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    const user = jwtDecode<IUser>(data.token);
    setUser(user);
  } catch (e) {
    logout()
    switchAuth(false);
  }
};
