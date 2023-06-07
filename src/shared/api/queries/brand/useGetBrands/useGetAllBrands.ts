import {useQuery} from "react-query";
import {Brand} from "./types";
import {$host} from "../../../http";

export const useGetAllBrands = () => useQuery<Brand[]>('getAllBrands', async () => {
        const {data} = await $host.get('api/brand/get_all')
        return data
})