import {useQuery} from "react-query";
import {$adminHost} from "../../../http";
import {User} from "./types";

export const useGetAllUsers= () => useQuery<User[]>('getAllUsers', async () => {
    try {
        const {data} = await $adminHost.get('api/user/get_all')
        return data
    }catch (e) {
        alert('Произошла ошибка получения видов продуктов!')
    }
})