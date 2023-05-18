import { $adminHost } from "../../../http";

export const removeProduct = async (id: number | string | null) => {
    const { data } = await $adminHost.delete("api/product/delete", {
        data: {
            id
        }
    });
    return data;
};
