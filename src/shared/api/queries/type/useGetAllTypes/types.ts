export type Type = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    brandId: number;
    brand: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    }
}