import {useQuery} from "react-query";
import {$host} from "../../../http";
import {Product} from "./types";

export const useGetAllProducts = () => useQuery<Product[]>('getAllProducts', async () => {
    try {
        const {data} = await $host.get('api/product/get_all')
        return data
    }catch (e) {
        alert('Произошла ошибка получения продуктов!')
    }
})