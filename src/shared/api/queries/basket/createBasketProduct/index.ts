import {$authHost} from "../../../http";

export const useCreateBasketProduct = async (title: string, description: string, price: number, basketId: number | undefined, productId: number, size?: string, paste?: string) => {
    try {
        const {data} = await $authHost.post('api/basket-product/create', {
            title, description, size, paste, price, basketId, productId
        })
        return data;
    }catch (e) {
        alert('Не удалось добавить товар в корзину')
    }
}