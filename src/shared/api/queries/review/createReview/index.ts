import { $authHost } from "../../../http";

export const createReview = async (title: string, description: string, rating: string | number, userId: number | undefined) => {
    const { data } = await $authHost.post("api/review/create", {
        title, description, rating, userId
    });
    return data;
};
