export type Brand = {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        types: {
            id: number,
            name: string,
            createdAt: string,
            updatedAt: string,
            brandId: number
        }[];
}