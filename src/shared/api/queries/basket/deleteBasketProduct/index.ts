import {$authHost} from "../../../http";

export const deleteBasketProduct = async (id: number | undefined) => {
    const { data } = await $authHost.delete('api/basket-product/delete', {
        data: {
            id
        }
    })
    return data
}