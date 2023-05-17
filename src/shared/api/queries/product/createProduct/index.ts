import { $adminHost } from "../../../http";

export const createProduct = async (formData: FormData) => {
  const { data } = await $adminHost.post("api/product/create", formData);
  return data;
};
