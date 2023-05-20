import {useQuery} from "react-query";
import {$authHost} from "../../../http";
import {Basket} from "./types";

export const useGetBasket = (id: string | undefined) => useQuery<Basket>('getOneBasket', async () => {
    try {
        const {data} = await $authHost.get(`api/basket/get_one/${id}`)
        return data
    }catch (e) {
        alert('Произошла ошибка получения видов продуктов!')
    }
}, {
    keepPreviousData: true
})