import {$adminHost} from "../../../http";

export const removeUser = async (id: string | null) => {
    try{
        const {data} = await $adminHost.delete('api/user/delete', {data: {id}})
        return data
    }catch (e){
        alert(e)
    }
}