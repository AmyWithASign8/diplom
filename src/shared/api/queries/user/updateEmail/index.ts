import {$authHost} from "../../../http";

export const updateEmail = async (email: string, id: number | undefined) => {
        const {data} = await $authHost.post('api/user/update_email', {
            email,
            id
        })
        return data
}