import {useQuery} from "react-query";
import {$host} from "../../../http";
import {Product} from "./types";

export const useGetAllProducts = (query: string | null, typeId: string | number, byPrice: string | null, brandId: string | null) => useQuery<Product[]>(['getAllProducts', query, byPrice, typeId, brandId], async () => {
        if (byPrice === null) byPrice = 'none'
        if (typeId=== null) typeId = 'none'
        if (brandId === null) brandId = 'none'
        const {data} = await $host.get(`api/product/search?typeId=${typeId}&byPrice=${byPrice}&brandId=${brandId}&query=${query}`)
        return data
})