import {useQuery} from "react-query";
import {$adminHost, $authHost} from "../../../http";
import {Orders} from "./types";

export const useGetAllOrders = (id: string | undefined) => useQuery<Orders[]>('getAllOrders', async () => {
        const {data} = await $authHost.get(`api/orders/get_all/${id}`)
        return data
}, {
    keepPreviousData: true
})
export const useGetAllOrdersForAdmin = () => useQuery<Orders[]>('getAllOrdersForAdmin', async () => {
    const {data} = await $adminHost.get('api/orders/admin/get_all')
    return data
}, {
    keepPreviousData: true
})