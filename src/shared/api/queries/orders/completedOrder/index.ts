import {$adminHost} from "../../../http";

export const CompletedOrder = async (status: string, id: number | undefined) => {
    await $adminHost.post('api/orders/admin/view-order', {
        status, id
    })
}