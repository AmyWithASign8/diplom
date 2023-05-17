import {useQuery} from "react-query";
import {$host} from "../../../http";
import {Type} from "./types";

export const useGetAllTypes = () => useQuery<Type[]>('getAllTypes', async () => {
    try {
        const {data} = await $host.get('api/type/get_all')
        return data
    }catch (e) {
        alert('Произошла ошибка получения видов продуктов!')
    }
})