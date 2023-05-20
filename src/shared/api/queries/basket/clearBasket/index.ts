import {$authHost} from "../../../http";

export const clearBasket = async (id: string | undefined) => {
    const {data} = await $authHost.delete(`api/basket-product/clear-basket/${id}`)
    return data
}