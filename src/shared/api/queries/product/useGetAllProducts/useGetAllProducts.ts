import {useQuery} from "react-query";
import {$host} from "../../../http";
import {Product} from "./types";

export const useGetAllProducts = (query: string | null, typeId: string | number, byPrice: string | null) => useQuery<Product[]>('getAllProducts', async () => {
    try {
        if (byPrice === null) byPrice = 'none'
        const {data} = await $host.get(`api/product/search?typeId=${typeId}&byPrice=${byPrice}&query=${query}`)
        return data
    }catch (e) {
        alert('Произошла ошибка получения продуктов!')
    }
})