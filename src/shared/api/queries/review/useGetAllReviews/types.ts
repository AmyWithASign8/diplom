export type Review = {
    id: number
    title: string
    description: string
    rating: number
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
}
}