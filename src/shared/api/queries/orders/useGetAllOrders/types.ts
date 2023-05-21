export type Orders = {
    id: number
    price: number
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
    orderProducts: {
        id: number
        title: string
        description: string
        size: number
        paste: string
        price: number
        createdAt: string
        updatedAt: string
        orderId: number
        productId: number
        product: {
            id: number
            title: string
            description: string
            price: number
            additional: string | null,
            image: string
            createdAt: string
            updatedAt: string
            typeId: number
            brandId: number
            type: {
                id: number
                name: string
                createdAt: string
                updatedAt: string
                brandId: number
            },
            brand: {
                id: number
                name: string
                createdAt: string
                updatedAt: string
            }
        }
    }[],
}