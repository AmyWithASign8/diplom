import { $authHost } from "../../../http";

export const createProduct = async (formData: FormData) => {
  const { data } = await $authHost.post("api/product/create", formData);
  return data;
};
