import {useQuery} from "react-query";
import {$authHost} from "../../../http";
import {Basket} from "./types";

export const useGetBasket = (id: string | undefined) => useQuery<Basket>('getOneBasket', async () => {
        const {data} = await $authHost.get(`api/basket/get_one/${id}`)
        return data
}, {
    keepPreviousData: true
})