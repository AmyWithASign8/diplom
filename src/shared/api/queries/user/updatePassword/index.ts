import {$authHost} from "../../../http";

export const updatePassword = async (password: string, id: number | undefined) => {
    const {data} = await $authHost.post('api/user/update_password', {
        password,
        id
    })
    return data
}