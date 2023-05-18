export type User = {
    id: number
    email: string
    ordersCount: number
    totalSpent: number
    role: string
    createdAt: string
    updatedAt: string
    orders: {
        id: number
        title: string
        description: string
        size: number
        paste: string
        price: number
        createdAt: string
        updatedAt: string
        userId: number
    }[],
    reviews:
        {
            id: number
            title: string
            description: string
            rating: number
            createdAt: string
            updatedAt: string
            userId: number
        }[],
    basket: {
        id: number
        createdAt: string
        updatedAt: string
        userId: number
    }
}