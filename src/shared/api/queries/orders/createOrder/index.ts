import {$authHost} from "../../../http";

export const createOrder = async (price: number | undefined, userId: string) => {
    const {data} = await $authHost.post('api/orders/create', {
        price,
        userId
    })
    return data
}