import {$adminHost} from "../../../http";

export const ApprovalReview = async (status: string, id: number | undefined) => {
    await $adminHost.post('api/review/admin/approved', {
        status, id
    })
}