import {$adminHost} from "../../../http";

export const createType = async (name: string, brandId: number | string | null) => {
    const { data } = await $adminHost.post("api/type/create", {
        name,
        brandId,
    });
    return data;
};