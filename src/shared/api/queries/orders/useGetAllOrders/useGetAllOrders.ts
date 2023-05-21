import {useQuery} from "react-query";
import {$authHost} from "../../../http";
import {Orders} from "./types";

export const useGetAllOrders = (id: string | undefined) => useQuery<Orders[]>('getAllOrders', async () => {
    try {
        const {data} = await $authHost.get(`api/orders/get_all/${id}`)
        return data
    }catch (e) {
        alert('Произошла ошибка получения заказов!')
    }
}, {
    keepPreviousData: true
})