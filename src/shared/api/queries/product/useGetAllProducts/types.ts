export type Product = {
        id: number
        title: string
        description: string
        price: number,
        additional: string | null,
        image: string
        createdAt: string
        updatedAt: string
        typeId: number
        brandId: number
        brand: {
        id: number
            name: string
            createdAt: string
            updatedAt: string
    },
        type: {
        id: number
            name: string,
            createdAt: string,
            updatedAt: string,
            brandId: number
    }
}