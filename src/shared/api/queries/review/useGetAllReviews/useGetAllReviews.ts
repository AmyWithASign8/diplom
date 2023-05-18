import {useQuery} from "react-query";
import {$host} from "../../../http";
import {Review} from "./types";

export const useGetAllReviews = () => useQuery<Review[]>('getAllReviews', async () => {
    try {
        const {data} = await $host.get('api/review/get_all')
        return data
    }catch (e) {
        alert('Произошла ошибка получения видов продуктов!')
    }
})