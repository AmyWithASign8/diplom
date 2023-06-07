import {useQuery} from "react-query";
import {$adminHost} from "../../../http";
import {Review} from "./types";

export const useGetAllReviewsForAdmin = () => useQuery<Review[]>('getAllReviewsForAdmin', async () => {
    try {
        const {data} = await $adminHost.get('api/review/admin/get_all')
        return data
    }catch (e) {
        alert('Произошла ошибка получения видов продуктов!')
    }
})