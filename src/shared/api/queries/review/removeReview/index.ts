import {$adminHost} from "../../../http";

export const removeReview = async (id: number) => {
    try{
        const {data} = await $adminHost.delete('api/review/delete', {data:{id}})
        return data
    }catch (e) {
        alert(e)
    }
}