import {$adminHost} from "../../../http";

export const removeType = async (id: number | string | null) => {
    const { data } = await $adminHost.delete("api/type/delete", {
        data: {
            id
        }
    });
    return data;
};