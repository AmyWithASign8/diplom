export type Basket = {
    id: number
    createdAt: string
    updatedAt: string
    userId: number
    user: {
        id: number
        email: string
        ordersCount: number
        totalSpent: number
        role: string
        createdAt: string
        updatedAt: string
},
    ['basket-products']: {
        id: number
        title: string
        description: string
        size?: number
        paste?: string
        price: number
        product: {
            additional: string | null
            brandId: number
            createdAt: string
            description: string
            id: number
            image: string
            price: number
            title: string
            typeId: number
            updatedAt: string
        }
        createdAt: string
        updatedAt: string
        basketId: number
        productId: number
    }[] | []
}